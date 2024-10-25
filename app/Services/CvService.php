<?php

namespace App\Services;

use App\Http\Requests\SaveCVFormRequest;
use App\Models\Cv;
use Illuminate\Http\Request;
use App\Responses\APIResponse;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

class CvService
{

    public function newCV()
    {
        // xử lý logic và các phần khác sẽ tiến hành sau khi có các dữ liệu data user, cv
        return response()->json([
            'message' => 'hehehe?',
            'id' => 1
        ]);
    }

    public function saveCV(Request $request)
    {
        $userId = $request->user()->id;
        $content = $request->input('content');
        try {
         
            $cv = new Cv();
            $cv->user_id = $userId;
            $cv->content = $content;
            $cv->title = 'test';
            $cv->save();
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $content
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 501,
                'message' => $th,
                'data' => $content
            ]);
        }
    }
    public function getCvsU(Request $request)
    {
        $userId = $request->user()->id;
        $cvs = Cv::where('user_id', $userId)->get();
        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $cvs
        ]);
    }
    public function getCV(Request $request)
    {
      
        $cv = Cv::where('id', $request->input('id'))->first();
        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $cv
        ]);
    }
    public function deleteCV($id)
    {
        $cv = Cv::where('id', $id)->first();
        $cv->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }
}
