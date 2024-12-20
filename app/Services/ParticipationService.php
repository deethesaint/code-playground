<?php

namespace App\Services;

use App\Http\Requests\FinishContestFormRequest;
use App\Models\Contest;
use App\Models\Participation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ParticipationService
{
    public function participate(Request $request)
    {
        $participation = Participation::query();
        $participation->where('user_id', $request->user()->id);
        $participation->where('contest_id', $request->id);
        $participation->with('contest');
        $participation = $participation->first();
        if ($participation) {
            return $participation;
        } else {
            $participation = new Participation();
            $participation->contest_id = $request->id;
            $participation->user_id = $request->user()->id;
            $participation->started_at = Carbon::now();
            $participation->save();
        }
        return Participation::where('user_id', $request->user()->id)->first();
    }

    public function getParticipationU(Request $request)
    {
        $participation = Participation::query();
        $participation->where('user_id', $request->user()->id);
        $participation->where('contest_id', $request->input('contest_id'));
        return $participation->first();
    }

    public function finish(FinishContestFormRequest $request)
    {
        $participation = Participation::where('id', $request->input('id'))->first();
        $participation->update([
            'finished_at' => Carbon::now(),
            'finished_problems' => $request->input('finishedProblems')
        ]);
        return $participation;
    }

    public function getResult(Request $request)
    {
        $participation = Participation::query();
        if ($request->input('user_id')) {
            $participation->where('user_id', $request->input('user_id'));
        } else {
            $participation->where('user_id', $request->user()->id);
        }
        $participation->where('contest_id', $request->input('contest_id'));
        return ['participation' => $participation->first(), 'attempts' => $participation->first()?->attempts()->get()];
    }

    public function getResults(Request $request)
    {
        $participation = Participation::query();
        $participation->selectRaw('participation.*,TIMESTAMPDIFF(second, started_at, finished_at) as duration');
        $participation->where('contest_id', $request->input('contest_id'));
        $participation->where('finished_at', '!=', null);
        $participation->orderBy('finished_problems', 'desc');
        $participation->orderBy('duration', 'asc');
        return $participation->paginate(2);
    }

    public function getRecentParticipation(Request $request)
    {
        return Participation::where('user_id', $request->user()->id)
            ->where('finished_at', '!=', null)
            ->orderBy('finished_at', 'desc')
            ->paginate(8);
    }

    public function getRecentParticipationById(Request $request)
    {
        return Participation::where('user_id', $request->input('user_id'))
            ->where('finished_at', '!=', null)
            ->orderBy('finished_at', 'desc')
            ->paginate(8);
    }
    public function getParticipantsContestU($id, Request $request)
    {
        $participation = Participation::where('contest_id', $id);
        $contest = Contest::where('id', $id)->first();

        return response()->json(
            [
                'participation' => $participation->paginate(8),
                'contest' => $contest,
                'isEnded'=> $contest->end_date < Carbon::now()
            ]
        );
    }
}
