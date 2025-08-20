import {
  AlertTriangle,
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
  PieChart,
  Radar,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  ThumbsDown,
  TrendingDown,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import candidatesData from "../data/candidates.json";
import interviewRoundsData from "../data/interviewRounds.json";
import { Candidate, InterviewRound } from "../types";

// AI分析接口定义
interface AIAnalysis {
  candidateId: string;
  aiScore: number;
  confidence: number;
  strengths: string[];
  weaknesses: string[];
  skillsAnalysis: SkillAnalysis[];
  personalityInsights: PersonalityInsight[];
  hiringRecommendation: {
    recommendation: 'strong_hire' | 'hire' | 'maybe' | 'no_hire';
    reasoning: string;
    confidenceLevel: number;
  };
  riskAssessment: RiskFactor[];
  culturalFitScore: number;
  growthPotential: number;
}

interface SkillAnalysis {
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  aiAssessment: number;
  evidence: string[];
  improvement: string;
}

interface PersonalityInsight {
  trait: string;
  score: number;
  description: string;
  jobRelevance: number;
}

interface RiskFactor {
  factor: string;
  level: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string;
}

interface AIInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  actionable: boolean;
  data?: any;
}

const InterviewReports: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [interviews, setInterviews] = useState<InterviewRound[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [showReportModal, setShowReportModal] = useState(false);
  const [aiAnalyses, setAiAnalyses] = useState<Map<string, AIAnalysis>>(new Map());
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<'overview' | 'skills' | 'personality' | 'risks'>('overview');

  useEffect(() => {
    setCandidates(candidatesData as Candidate[]);
    setInterviews(interviewRoundsData as InterviewRound[]);
    
    // 生成AI分析数据
    generateAIAnalyses();
    generateAIInsights();
  }, []);

  // 生成AI分析数据
  const generateAIAnalyses = () => {
    const analyses = new Map<string, AIAnalysis>();
    
    candidatesData.forEach(candidate => {
      const analysis: AIAnalysis = {
        candidateId: candidate.id,
        aiScore: Math.round((Math.random() * 3 + 7) * 10) / 10, // 7-10分
        confidence: Math.round(Math.random() * 20 + 80), // 80-100%
        strengths: [
          '技术深度扎实，对核心技术有深入理解',
          '学习能力强，能快速掌握新技术',
          '系统设计思路清晰，架构能力优秀',
          '沟通表达能力良好，逻辑思维清晰'
        ],
        weaknesses: [
          '在某些新兴技术领域经验相对不足',
          '项目管理经验需要进一步提升',
          '跨团队协作能力有待加强'
        ],
        skillsAnalysis: [
          { skill: 'React', level: 'advanced', aiAssessment: 8.5, evidence: ['熟练使用Hooks', '深入理解虚拟DOM'], improvement: '建议学习React 18新特性' },
          { skill: 'TypeScript', level: 'intermediate', aiAssessment: 7.2, evidence: ['基础语法熟练', '类型定义清晰'], improvement: '深入学习高级类型操作' },
          { skill: '系统设计', level: 'advanced', aiAssessment: 8.8, evidence: ['架构思路清晰', '考虑因素全面'], improvement: '增加大规模系统经验' }
        ],
        personalityInsights: [
          { trait: '主动性', score: 85, description: '工作积极主动，有强烈的责任心', jobRelevance: 90 },
          { trait: '团队合作', score: 78, description: '具备良好的团队协作精神', jobRelevance: 85 },
          { trait: '创新思维', score: 82, description: '思维活跃，具有创新意识', jobRelevance: 88 }
        ],
        hiringRecommendation: {
          recommendation: Math.random() > 0.3 ? 'hire' : 'strong_hire',
          reasoning: 'AI综合分析显示该候选人技术能力强，学习能力突出，与团队文化高度匹配，建议录用',
          confidenceLevel: Math.round(Math.random() * 15 + 85)
        },
        riskAssessment: [
          { factor: '技术适应性', level: 'low', description: '能够快速适应新技术栈', mitigation: '提供充分的技术培训' },
          { factor: '团队融入', level: 'medium', description: '可能需要时间适应团队文化', mitigation: '安排导师制度' }
        ],
        culturalFitScore: Math.round(Math.random() * 20 + 75), // 75-95
        growthPotential: Math.round(Math.random() * 25 + 75) // 75-100
      };
      
      analyses.set(candidate.id, analysis);
    });
    
    setAiAnalyses(analyses);
  };

  // 生成AI洞察
  const generateAIInsights = () => {
    const insights: AIInsight[] = [
      {
        id: '1',
        type: 'trend',
        title: '技能趋势分析',
        description: 'React和TypeScript技能的候选人表现普遍优于其他技术栈20%',
        importance: 'high',
        actionable: true
      },
      {
        id: '2', 
        type: 'recommendation',
        title: '面试流程优化',
        description: 'AI分析发现技术面试时间过长影响候选人体验，建议优化至45分钟',
        importance: 'medium',
        actionable: true
      },
      {
        id: '3',
        type: 'prediction',
        title: '招聘成功预测',
        description: '基于AI模型预测，当前候选人池中有3位成功概率超过90%',
        importance: 'high',
        actionable: true
      },
      {
        id: '4',
        type: 'anomaly',
        title: '异常模式检测',
        description: '发现某些候选人在技术面试中表现与简历描述不符，建议加强验证',
        importance: 'medium',
        actionable: true
      }
    ];
    
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
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 text-primary-500 mr-3" />
            AI智能面试报告
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            基于机器学习的深度分析，提供全方位候选人评估和智能决策建议
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-secondary">
            <BarChart3 className="h-4 w-4 mr-2" />
            深度分析
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setIsAnalyzing(true)}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {isAnalyzing ? 'AI分析中...' : 'AI重新分析'}
          </button>
          <button className="btn btn-primary">
            <Bot className="h-4 w-4 mr-2" />
            AI智能总结
          </button>
        </div>
      </div>

      {/* AI智能统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card p-4 border-l-4 border-l-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">AI分析覆盖</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% 本周
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-l-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">AI推荐精度</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <Sparkles className="h-3 w-3 mr-1" />
                优秀
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">AI平均评分</p>
              <p className="text-2xl font-bold text-gray-900">8.1</p>
              <p className="text-xs text-purple-600">/10 智能评估</p>
            </div>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-l-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ThumbsUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">AI推荐录用</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-xs text-yellow-600">高质量候选人</p>
            </div>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-l-red-500">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">风险提醒</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-xs text-red-600">需关注</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI洞察面板 */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            AI智能洞察
          </h3>
          <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-medium">
            实时更新
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiInsights.map((insight) => {
            const icons = {
              trend: TrendingUp,
              recommendation: Lightbulb,
              prediction: Target,
              anomaly: AlertTriangle
            };
            const Icon = icons[insight.type];
            const colors = {
              high: 'bg-red-50 border-red-200 text-red-800',
              medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
              low: 'bg-blue-50 border-blue-200 text-blue-800'
            };
            return (
              <div key={insight.id} className={`p-4 rounded-lg border ${colors[insight.importance]}`}>
                <div className="flex items-start">
                  <Icon className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs leading-relaxed">{insight.description}</p>
                    {insight.actionable && (
                      <button className="text-xs font-medium hover:underline mt-2">
                        查看详情 →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 搜索和筛选 */}
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

      {/* 报告列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => {
          const mockReports = generateMockReport(candidate);
          const avgScore =
            mockReports.length > 0
              ? mockReports.reduce((sum, r) => sum + r.overallScore, 0) /
                mockReports.length
              : 0;

          return (
            <div key={candidate.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-700 font-medium">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-500">高级前端工程师</p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(avgScore)}`}
                  >
                    {avgScore.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500">平均分</div>
                </div>
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
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewReport(candidate)}
                    className="btn btn-sm btn-secondary"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    查看详情
                  </button>
                  <button className="btn btn-sm btn-primary">
                    <Download className="h-3 w-3 mr-1" />
                    导出
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
              <h3 className="text-xl font-bold text-gray-900">
                {selectedCandidate.name} - 面试报告详情
              </h3>
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

            <div className="flex justify-end space-x-3 mt-6">
              <button className="btn btn-secondary">
                <Download className="h-4 w-4 mr-2" />
                导出PDF
              </button>
              <button className="btn btn-primary">
                <Brain className="h-4 w-4 mr-2" />
                生成AI总结
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewReports;
