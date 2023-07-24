<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\APHIssueProduction;
use App\Models\EvaluateMeeting;

class IssueProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $issueProduction;
    protected $evaluateMeeting;

    public function __construct(APHIssueProduction $issueProduction, EvaluateMeeting $evaluateMeeting)
    {
        $this->issueProduction = $issueProduction;
        $this->evaluateMeeting = $evaluateMeeting;
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

    public function getAllIssue()
    {
        try 
        {
            $data = $this->issueProduction->orderBy('created_at', 'DESC')->get();
            return response()->json(["message" => "Thành công", "data" => $data], 200);
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Xảy ra lỗi"], 400);
        }
    }

    public function fillIssue(Request $request)
    {
        try 
        {
            if(!$request->created_at && !$request->line_code && !$request->affect && !$request->is_solved) {
                $data = $this->issueProduction->orderBy('created_at', 'DESC')->get();
                return response()->json(["message" => "Thành công", "data" => $data], 200);
            } else {
                $data = $this->issueProduction->when($request->created_at, function($q) use($request) {
                    return $q->whereDate("created_at", $request->created_at);
                })
                ->when($request->line_code, function($q) use($request) {
                    return $q->where("line_code", $request->line_code);
                })
                ->when($request->affect, function($q) use($request) {
                    return $q->where("affect", $request->affect);
                })
                ->when($request->is_solved, function($q) use($request) {
                    return $q->where("is_solved", $request->is_solved);
                })
                ->get();

                return response()->json(["message" => "Thành công", "data" => $data], 200);
            }
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Tìm kiếm thất bại"], 400);
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

    public function scoreEvaluate(Request $request)
    {
        try 
        {
            if(!$request->line_code || !$request->evaluate_date) {
                return response()->json(["error" => "Xảy ra lỗi"], 400);
            }

            $data = $this->evaluateMeeting->select("total_point")->where([["line_code", $request->line_code], ["evaluate_date", $request->evaluate_date]])->first();
            if($data) {
                return response()->json(["message" => "Thành công", "score" => $data], 200);
            } else {
                return response()->json(["message" => "Thành công", "score" => (object)["total_point" => 0]], 200);
            }
        } 
        catch (\Throwable $th) 
        {
            return response()->json(["error" => "Xảy ra lỗi".$th->getMessage()], 400);
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
