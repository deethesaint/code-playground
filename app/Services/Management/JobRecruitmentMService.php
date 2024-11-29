<?php

namespace App\Services\Management;

use App\Http\Requests\UpdateUserFormRequest;
use App\Models\User;
use App\Utils\Constants\Status;
use App\Utils\Constants\Role;
use Illuminate\Http\Request;
use App\Models\JobRecruitment;
use App\mail\MailSendRequestChange;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailResponseReview;
use App\Models\Notification;
use Mockery\Matcher\Not;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

class JobRecruitmentMService
{
  public function getListSubscribeJobRecruitment()
  {
    $jobs = JobRecruitment::all()->where('status','!=', Status::APPROVED);
    $detailJobs = [];
    foreach ($jobs as $job) {
      $detailJobs[] = [
        'id' => $job->id,
        'user'=> $job->user,
        'title' => $job->title,
        'description' => $job->description,
        'status' => $job->status,
        'skill' => $job->skill,
        'location' => $job->location,
        'salary' => $job->salary,
        'negotiable' => $job->negotiable,
        'position_number' => $job->position_number, 
        'deadline' => $job->deadline,
        'change_required' => $job->change_required,
        'created_at' => $job->created_at,
        'updated_at' => $job->updated_at
      ];
    }
    return response()->json([
      'status' => '200',
      'data' => $detailJobs,
      'message' => 'Get list job recruitment successfully'
    ]);
  }

  public function approvedJob($id)
  {
    $job = JobRecruitment::find($id);
    if ($job) {
      $job->status = Status::APPROVED;
        // SEND MAIL
      Mail::to($job->user->email)->send(new MailResponseReview($job->user, $job,null, null, Status::ACTIVE));
      Notification::create([
        'user_id' => $job->user->id,
        'message' => 'Your '.$job->title.'has been approved by admin',
        'type' => 'Job recruitment',
        'fid' => 0,
        'is_read' => false
      ]);
      $job->save();
      return response()->json([
        'status' => '200',
        'message' => 'Job approved successfully'
      ]);
    } else {
      return response()->json([
        'status' => '404',
        'message' => 'Job not found'
      ]);
    }
  }

  public function rejectJob($id)
  {
    $job = JobRecruitment::find($id);
    if ($job) {
      $job->status = Status::REJECTED;
        // SEND MAIL
      Mail::to($job->user->email)->send(new MailResponseReview($job->user, $job,null, null, Status::REJECTED));
      Notification::create([
        'user_id' => $job->user->id,
        'message' => 'Your '.$job->title.' has been rejected by admin',
        'type' => 'Job recruitment',
        'fid' => 0,
        'is_read' => false
      ]);
      $job->save();
      return response()->json([
        'status' => '200',
        'message' => 'Job rejected successfully'
      ]);
    } else {
      return response()->json([
        'status' => '404',
        'message' => 'Job not found'
      ]);
    }
  }

  public function sendRequestChangeJob(Request $request)
  {
    try{
      $currentUser = User::find($request->user()->id);
      $job= JobRecruitment::find($request->input('id'));
      $job->change_required = $request->input('request_change');
      $userCompany = $job->user;
      Mail::to($userCompany->email)->send(new MailSendRequestChange($userCompany,$request->input('request_change')));
      Notification::create([
        'user_id' => $userCompany->id,
        'message' => 'You have a new request change job '.$job->title.'from Admin',
        'type' => 'Request change job',
        'fid' => 0,
        'is_read' => false
      ]);
      $job->save();
      return response()->json([
        'status' => '200',
        'message' => 'Send request change job successfully',
        'data' => $job,
      ]);
    }catch(\Exception $e){
      return response()->json([
        'status' => '500',
        'message' => 'Send request change job failed'
      ]);
    }
  }

  public function deleteJob($id)
  {
    
  }
}
