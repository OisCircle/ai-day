import {
  BarChart3,
  Bot,
  Brain,
  Calendar,
  CheckCircle,
  Download,
  Eye,
  FileText,
  Filter,
  Lightbulb,
  Search,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import candidatesData from "../data/candidates.json";
import interviewRoundsData from "../data/interviewRounds.json";
import { Candidate, InterviewRound } from "../types";

// AI分析数据接口
interface AIInsight {
  candidateId: string;
  aiScore: number;
  confidence: number;
  recommendation: string;
  reasoning: string;
  skills: { name: string; score: number }[];
  personalityTraits: { trait: string; score: number }[];
  culturalFit: number;
  riskLevel: "low" | "medium" | "high";
}

const InterviewReports: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [interviews, setInterviews] = useState<InterviewRound[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [showReportModal, setShowReportModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<Map<string, AIInsight>>(
    new Map()
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setCandidates(candidatesData as Candidate[]);
    setInterviews(interviewRoundsData as InterviewRound[]);
    // 生成AI分析数据
    generateAIInsights();
  }, []);

  // 生成AI分析数据
  const generateAIInsights = () => {
    const insights = new Map<string, AIInsight>();

    candidatesData.forEach((candidate) => {
      insights.set(candidate.id, {
        candidateId: candidate.id,
        aiScore: Math.round((Math.random() * 2.5 + 7.5) * 10) / 10, // 7.5-10分
        confidence: Math.round(Math.random() * 15 + 85), // 85-100%
        recommendation: Math.random() > 0.3 ? "strong_hire" : "hire",
        reasoning:
          "AI综合分析显示该候选人技术能力强，学习能力突出，与团队文化高度匹配",
        skills: [
          {
            name: "React",
            score: Math.round((Math.random() * 2 + 8) * 10) / 10,
          },
          {
            name: "TypeScript",
            score: Math.round((Math.random() * 2 + 7) * 10) / 10,
          },
          {
            name: "系统设计",
            score: Math.round((Math.random() * 3 + 7) * 10) / 10,
          },
        ],
        personalityTraits: [
          { trait: "主动性", score: Math.round(Math.random() * 20 + 80) },
          { trait: "团队合作", score: Math.round(Math.random() * 15 + 75) },
          { trait: "学习能力", score: Math.round(Math.random() * 25 + 75) },
        ],
        culturalFit: Math.round(Math.random() * 20 + 80), // 80-100%
        riskLevel: Math.random() > 0.7 ? "medium" : "low",
      });
    });

    setAiInsights(insights);
  };

  // 生成模拟面试报告
  const generateMockReport = (candidate: Candidate) => {
    const completedInterviews = interviews.filter(
      (i) => i.candidateId === candidate.id && i.status === "completed"
    );

    const reports = completedInterviews.map((interview) => ({
      id: `report_${interview.id}`,
      interviewType: interview.type,
      interviewerName: "李四", // 模拟数据
      date: interview.scheduledTime,
      overallScore: interview.evaluation.overallScore,
      recommendation: interview.evaluation.recommendation,
      strengths:
        interview.type === "tech_1"
          ? ["React技术栈掌握扎实", "系统设计思路清晰", "代码质量高"]
          : ["沟通表达能力强", "学习能力突出", "团队协作意识好"],
      weaknesses:
        interview.type === "tech_1"
          ? ["部分新技术了解不够深入", "性能优化经验需要加强"]
          : ["项目管理经验相对不足"],
      detailedFeedback:
        interview.type === "tech_1"
          ? "候选人在技术面试中表现出色，对React生态系统有深入理解，能够清晰地解释复杂的技术概念。在系统设计题目中展现了良好的架构思维，但对一些新兴技术的了解还需要加强。"
          : "候选人表现出良好的沟通能力和学习意愿，回答问题逻辑清晰，对职业规划有明确的想法。在团队协作方面有丰富的经验分享。",
    }));

    return reports;
  };

  const filteredCandidates = candidates.filter((candidate) => {
    return (
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getRecommendationBadge = (recommendation: string) => {
    const map = {
      strong_hire: { text: "强烈推荐", class: "badge-success" },
      hire: { text: "推荐录用", class: "badge-success" },
      no_hire: { text: "不推荐", class: "badge-danger" },
      strong_no_hire: { text: "强烈不推荐", class: "badge-danger" },
    };
    const info = map[recommendation as keyof typeof map] || {
      text: recommendation,
      class: "badge-gray",
    };
    return <span className={`badge ${info.class}`}>{info.text}</span>;
  };

  const handleViewReport = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowReportModal(true);
  };

  return (
    <div className="space-y-6">
      {/* AI智能页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 text-primary-500 mr-3" />
            AI智能面试报告
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            基于机器学习算法深度分析候选人表现，提供智能化招聘决策支持
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="btn btn-secondary"
            onClick={() => setIsAnalyzing(true)}
            disabled={isAnalyzing}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {isAnalyzing ? "AI分析中..." : "AI深度分析"}
          </button>
          <button className="btn btn-primary">
            <Sparkles className="h-4 w-4 mr-2" />
            生成AI报告
          </button>
        </div>
      </div>

      {/* AI智能统计面板 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-700">AI分析覆盖</p>
              <p className="text-2xl font-bold text-blue-900">100%</p>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <Sparkles className="h-3 w-3 mr-1" />
                全面智能分析
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-500 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-700">AI推荐精度</p>
              <p className="text-2xl font-bold text-green-900">94.2%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% 本月
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-700">AI平均评分</p>
              <p className="text-2xl font-bold text-purple-900">8.3</p>
              <p className="text-xs text-purple-600">/10 智能评估</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="p-2 bg-orange-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-700">AI推荐录用</p>
              <p className="text-2xl font-bold text-orange-900">78%</p>
              <p className="text-xs text-orange-600">智能筛选率</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI智能洞察面板 */}
      <div className="card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            AI智能洞察
          </h3>
          <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-medium">
            实时更新
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start p-3 bg-white bg-opacity-60 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">技能趋势分析</p>
              <p className="text-gray-600">
                React和TypeScript技能的候选人表现优于其他技术栈15%
              </p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-white bg-opacity-60 rounded-lg">
            <Target className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">匹配度预测</p>
              <p className="text-gray-600">
                AI识别出3位高匹配度候选人，建议优先安排终面
              </p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-white bg-opacity-60 rounded-lg">
            <Bot className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">智能建议</p>
              <p className="text-gray-600">
                优化面试流程，AI分析显示技术面试时长可缩短至40分钟
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI智能搜索和筛选 */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="AI智能搜索候选人..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <select className="select">
              <option>AI推荐排序</option>
              <option>评分最高</option>
              <option>匹配度最佳</option>
              <option>风险最低</option>
            </select>
            <button className="btn btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              AI智能筛选
            </button>
          </div>
        </div>
      </div>

      {/* AI智能报告列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => {
          const mockReports = generateMockReport(candidate);
          const aiInsight = aiInsights.get(candidate.id);
          const avgScore =
            mockReports.length > 0
              ? mockReports.reduce((sum, r) => sum + r.overallScore, 0) /
                mockReports.length
              : 0;

          if (!aiInsight) return null;

          return (
            <div
              key={candidate.id}
              className="card p-6 border-l-4 border-l-primary-500"
            >
              {/* 候选人头部信息和AI评分 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-lg">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {candidate.name}
                      </h3>
                      {aiInsight.recommendation === "strong_hire" && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          AI强推
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      高级前端工程师 • 文化匹配 {aiInsight.culturalFit}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">
                        {aiInsight.aiScore}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Brain className="h-3 w-3 mr-1" />
                        AI评分
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${getScoreColor(
                          avgScore
                        )}`}
                      >
                        {avgScore.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">传统评分</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 mt-2 flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    置信度 {aiInsight.confidence}%
                  </div>
                </div>
              </div>

              {/* AI技能分析 */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <Zap className="h-4 w-4 text-purple-500 mr-2" />
                  AI技能分析
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {aiInsight.skills.slice(0, 3).map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-gray-50 p-2 rounded-lg text-center"
                    >
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        {skill.name}
                      </div>
                      <div
                        className={`text-lg font-bold ${getScoreColor(
                          skill.score
                        )}`}
                      >
                        {skill.score}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full"
                          style={{ width: `${(skill.score / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI人格洞察 */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <User className="h-4 w-4 text-green-500 mr-2" />
                  AI人格洞察
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiInsight.personalityTraits.map((trait) => (
                    <div
                      key={trait.trait}
                      className="bg-green-50 px-2 py-1 rounded-full text-xs"
                    >
                      <span className="font-medium text-green-800">
                        {trait.trait}
                      </span>
                      <span className="text-green-600 ml-1">
                        {trait.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI推荐理由 */}
              <div className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
                  AI分析结论
                </h4>
                <p className="text-sm text-gray-700">{aiInsight.reasoning}</p>
              </div>

              {/* 面试轮次报告 */}
              <div className="space-y-3 mb-4">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {report.interviewType === "hr"
                            ? "HR面试"
                            : report.interviewType === "tech_1"
                            ? "技术一面"
                            : report.interviewType === "tech_2"
                            ? "技术二面"
                            : "VP面试"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(report.date).toLocaleDateString("zh-CN")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm font-medium ${getScoreColor(
                          report.overallScore
                        )}`}
                      >
                        {report.overallScore}/10
                      </span>
                      {getRecommendationBadge(report.recommendation)}
                    </div>
                  </div>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(candidate.createdAt).toLocaleDateString("zh-CN")}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {mockReports.length} 轮面试
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-1 ${
                        aiInsight.riskLevel === "low"
                          ? "bg-green-400"
                          : aiInsight.riskLevel === "medium"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    />
                    {aiInsight.riskLevel === "low"
                      ? "低风险"
                      : aiInsight.riskLevel === "medium"
                      ? "中风险"
                      : "高风险"}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewReport(candidate)}
                    className="btn btn-sm btn-secondary"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    AI详情
                  </button>
                  <button className="btn btn-sm btn-primary">
                    <Download className="h-3 w-3 mr-1" />
                    AI报告
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 报告详情模态框 */}
      {showReportModal && selectedCandidate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Brain className="h-7 w-7 text-primary-500 mr-3" />
                  {selectedCandidate.name} - AI智能分析报告
                </h3>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  由AI算法深度分析生成，提供全方位候选人评估
                </p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* AI综合评估面板 */}
            {aiInsights.get(selectedCandidate.id) && (
              <div className="mb-8 card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 text-primary-500 mr-2" />
                  AI综合评估
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      {aiInsights.get(selectedCandidate.id)!.aiScore}
                    </div>
                    <div className="text-sm text-gray-600">AI总评分</div>
                    <div className="text-xs text-primary-600 mt-1">/10 分</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {aiInsights.get(selectedCandidate.id)!.culturalFit}%
                    </div>
                    <div className="text-sm text-gray-600">文化匹配度</div>
                    <div className="text-xs text-green-600 mt-1">高度匹配</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {aiInsights.get(selectedCandidate.id)!.confidence}%
                    </div>
                    <div className="text-sm text-gray-600">AI置信度</div>
                    <div className="text-xs text-blue-600 mt-1">高置信度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {aiInsights.get(selectedCandidate.id)!.riskLevel === "low"
                        ? "低"
                        : aiInsights.get(selectedCandidate.id)!.riskLevel ===
                          "medium"
                        ? "中"
                        : "高"}
                    </div>
                    <div className="text-sm text-gray-600">风险等级</div>
                    <div className="text-xs text-orange-600 mt-1">风险评估</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white bg-opacity-70 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>AI分析结论：</strong>
                    {aiInsights.get(selectedCandidate.id)!.reasoning}
                  </p>
                </div>
              </div>
            )}

            {generateMockReport(selectedCandidate).map((report) => (
              <div key={report.id} className="mb-8 card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {report.interviewType === "hr"
                      ? "HR面试报告"
                      : report.interviewType === "tech_1"
                      ? "技术一面报告"
                      : report.interviewType === "tech_2"
                      ? "技术二面报告"
                      : "VP面试报告"}
                  </h4>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-xl font-bold ${getScoreColor(
                        report.overallScore
                      )}`}
                    >
                      {report.overallScore}/10
                    </span>
                    {getRecommendationBadge(report.recommendation)}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                      优势表现
                    </h5>
                    <ul className="space-y-2">
                      {report.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-sm text-gray-600">
                            {strength}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-2 text-orange-600" />
                      改进建议
                    </h5>
                    <ul className="space-y-2">
                      {report.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-sm text-gray-600">
                            {weakness}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 mb-3">详细反馈</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {report.detailedFeedback}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                  <div>面试官: {report.interviewerName}</div>
                  <div>
                    面试时间:{" "}
                    {new Date(report.date).toLocaleDateString("zh-CN")}
                  </div>
                </div>
              </div>
            ))}

            {/* AI技能和人格详细分析 */}
            {aiInsights.get(selectedCandidate.id) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* AI技能深度分析 */}
                <div className="card p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Zap className="h-5 w-5 text-purple-500 mr-2" />
                    AI技能深度分析
                  </h4>
                  <div className="space-y-4">
                    {aiInsights
                      .get(selectedCandidate.id)!
                      .skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {skill.name}
                            </span>
                            <span
                              className={`text-sm font-bold ${getScoreColor(
                                skill.score
                              )}`}
                            >
                              {skill.score}/10
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full"
                              style={{ width: `${(skill.score / 10) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            AI分析：该技能在细分领域表现优秀，具有强烈的业务适用性
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* AI人格特质分析 */}
                <div className="card p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 text-green-500 mr-2" />
                    AI人格特质分析
                  </h4>
                  <div className="space-y-4">
                    {aiInsights
                      .get(selectedCandidate.id)!
                      .personalityTraits.map((trait) => (
                        <div
                          key={trait.trait}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                        >
                          <div>
                            <span className="text-sm font-medium text-green-800">
                              {trait.trait}
                            </span>
                            <p className="text-xs text-green-600 mt-1">
                              AI评估：表现优异，与职位高度匹配
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {trait.score}
                            </div>
                            <div className="text-xs text-green-500">/100</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button className="btn btn-secondary">
                <Download className="h-4 w-4 mr-2" />
                导出AI报告
              </button>
              <button className="btn btn-primary">
                <Sparkles className="h-4 w-4 mr-2" />
                生成AI深度分析
              </button>
              <button className="btn btn-primary">
                <Bot className="h-4 w-4 mr-2" />
                AI对话分析
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewReports;
