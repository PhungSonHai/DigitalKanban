<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\APHIssueProduction;

class IssueProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $issueProduction;

    public function __construct(APHIssueProduction $issueProduction)
    {
        $this->issueProduction = $issueProduction;
    }

    public function index()
    {
        //
    }

    public function getIssueOfLine(Request $request) 
    {
        try 
        {
            $data = $this->issueProduction->where("line_code", $request->line_code)->orderBy('created_at', "DESC")->get();
            return response()->json(["message" => "Lấy vấn đề thành công", "data" => $data], 200);
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Lấy vấn đề theo chuyền không thành công"], 400);
        }
    }

    public function addIssue(Request $request)
    {
        try 
        {
            if($request->line_code) {
                $issueExist = $this->issueProduction->where([["issue_of", $request->issue_of], ["line_code", $request->line_code], ["affect", $request->affect], ["reason", $request->reason], ["description_reason", $request->description_reason], ["action_resolve", $request->action_resolve], ["responsible", $request->responsible], ["is_solved", 0]])->first();

                if($issueExist) {
                    return response()->json(["error" => "Vấn đề này đã được thêm đang đợi giải quyết"], 400);
                }

                $dataCreate = [
                    "line_code" => $request->line_code,
                    "affect" => $request->affect,
                    "reason" => $request->reason,
                    "description_reason" => $request->description_reason,
                    "action_resolve" => $request->action_resolve,
                    "responsible" => $request->responsible,
                    "issue_of" => $request->issue_of
                ];

                $resCreate = $this->issueProduction->create($dataCreate);

                if($resCreate) {
                    return response()->json(["message" => "Thêm vấn đề thành công"], 200);
                }
            }

            return response()->json(["error" => "Thêm vấn đề lỗi"], 400);
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Thêm vấn đề lỗi"], 400);
        }
    }

    public function completeIssue(Request $request)
    {
        try 
        {
            if($request->id) {
                $issueExist = $this->issueProduction->where('id', $request->id)->first();
                if(!$issueExist) {
                    return response()->json(["error" => "Vấn đề không tồn tại"], 400);
                }

                $result = $this->issueProduction->where('id', $request->id)->update([
                    "is_solved" => 1
                ]);

                if($result) {
                    return response()->json(["message" => "Thành công"], 200);
                }
            }
            else {
                return response()->json(["error" => "Xảy ra lỗi"], 400);
            }
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Xảy ra lỗi"], 400);
        }
    }

    public function cancelIssue(Request $request)
    {
        try 
        {
            if($request->id) {
                $issueExist = $this->issueProduction->where('id', $request->id)->first();
                if(!$issueExist) {
                    return response()->json(["error" => "Vấn đề không tồn tại"], 400);
                }

                $result = $this->issueProduction->where('id', $request->id)->delete();

                if($result) {
                    return response()->json(["message" => "Thành công"], 200);
                }
            }
            else {
                return response()->json(["error" => "Xảy ra lỗi"], 400);
            }
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Xảy ra lỗi"], 400);
        }
    }

    public function statisticIssue(Request $request)
    {
        try 
        {
            $allIssue = $this->issueProduction->where("line_code", $request->line_code)->get();
            if($allIssue) {
                $data = (object)[];
                $data->quantity_issue = $allIssue->where("affect", "Sản lượng")->count();
                $data->quality_issue = $allIssue->where("affect", "Chất lượng")->count();
                $data->all_issue = $allIssue->count();
                $data->solved_issue = $allIssue->where("is_solved", 1)->count();
                $data->not_solved_issue = $allIssue->where("is_solved", 0)->count();

                return response()->json(["message" => "Thành công", "data" => $data], 200);
            }
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Xảy ra lỗi"], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
