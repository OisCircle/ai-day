import {
  AlertTriangle,
  BarChart3,
  Bot,
  Brain,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

const InterviewAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [selectedInterviewer, setSelectedInterviewer] = useState<string | null>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  // 模拟分析数据
  const analysisData = {
    summary: {
      totalInterviews: 156,
      averageScore: 7.2,
      passRate: 68,
      averageDuration: 85, // 分钟
    },
    trends: {
      monthly: [
        { month: "1月", interviews: 45, passRate: 64, avgScore: 6.8 },
        { month: "2月", interviews: 52, passRate: 71, avgScore: 7.1 },
        { month: "3月", interviews: 59, passRate: 68, avgScore: 7.2 },
      ],
    },
    interviewTypes: [
      { type: "HR面试", count: 156, passRate: 85, avgScore: 7.8 },
      { type: "技术一面", count: 132, passRate: 72, avgScore: 7.1 },
      { type: "技术二面", count: 95, passRate: 63, avgScore: 6.9 },
      { type: "VP面试", count: 60, passRate: 58, avgScore: 6.8 },
    ],
    interviewers: [
      { 
        id: "zhang_hr",
        name: "张三(HR)", 
        interviews: 45, 
        avgScore: 7.8, 
        efficiency: 92,
        aiScore: 8.5,
        strengths: ["沟通能力强", "面试节奏把控好", "候选人体验佳"],
        weaknesses: ["技术评估深度不够", "时间把控需改进"],
        aiAnalysis: "张三作为HR面试官表现优异，在候选人沟通和文化适配评估方面有独特优势，建议继续保持并加强技术理解。",
        personalityType: "友好型",
        consistency: 94,
        predictiveAccuracy: 89
      },
      { 
        id: "li_tech",
        name: "李四(技术)", 
        interviews: 38, 
        avgScore: 7.2, 
        efficiency: 88,
        aiScore: 7.9,
        strengths: ["技术深度把控准确", "问题设计合理", "逻辑思维清晰"],
        weaknesses: ["面试氛围略紧张", "沟通引导不足"],
        aiAnalysis: "李四技术功底扎实，评估准确度高，但在面试体验优化方面有提升空间，建议参加面试技巧培训。",
        personalityType: "分析型",
        consistency: 91,
        predictiveAccuracy: 95
      },
      { 
        id: "wang_tech",
        name: "王五(技术)", 
        interviews: 35, 
        avgScore: 6.9, 
        efficiency: 85,
        aiScore: 7.3,
        strengths: ["系统设计评估专业", "架构思维清晰", "经验丰富"],
        weaknesses: ["评分标准偏严格", "反馈不够及时"],
        aiAnalysis: "王五在系统架构评估方面表现突出，但评分标准需要校准，建议与其他面试官进行标准统一。",
        personalityType: "严谨型",
        consistency: 88,
        predictiveAccuracy: 87
      },
      { 
        id: "zhao_vp",
        name: "赵六(VP)", 
        interviews: 22, 
        avgScore: 6.8, 
        efficiency: 90,
        aiScore: 8.1,
        strengths: ["战略视野开阔", "领导力评估准确", "决策果断"],
        weaknesses: ["面试频次较低", "与候选人互动较少"],
        aiAnalysis: "赵六具有丰富的高级管理经验，在候选人潜力评估方面准确度很高，建议增加面试参与度。",
        personalityType: "领导型",
        consistency: 93,
        predictiveAccuracy: 91
      },
    ],
    skills: [
      { skill: "React", avgScore: 7.5, difficulty: "high", trend: "up" },
      {
        skill: "Node.js",
        avgScore: 7.1,
        difficulty: "medium",
        trend: "stable",
      },
      { skill: "Python", avgScore: 6.8, difficulty: "medium", trend: "down" },
      { skill: "系统设计", avgScore: 6.5, difficulty: "high", trend: "up" },
      { skill: "沟通能力", avgScore: 7.8, difficulty: "low", trend: "stable" },
    ],
    aiInsights: [
      {
        type: "improvement",
        title: "🚀 面试效率AI优化建议",
        description: "AI分析发现技术二面平均时长超出最优范围15%，建议引入结构化面试流程，预计可提升效率18%",
        priority: "high",
        confidence: 92,
        impact: "提升面试体验，节省时间成本",
        aiScore: 8.3
      },
      {
        type: "trend",
        title: "📈 候选人质量AI趋势预测",
        description: "基于机器学习模型预测，本季度候选人技术水平呈上升趋势，建议适当调整录用标准以匹配市场变化",
        priority: "high",
        confidence: 89,
        impact: "优化人才筛选精度，提高录用质量",
        aiScore: 8.7
      },
      {
        type: "alert",
        title: "⚠️ 面试官负载AI预警",
        description: "AI工作量分析显示面试官负载不均衡，李四超负荷30%，建议重新分配并提供支持",
        priority: "medium",
        confidence: 95,
        impact: "避免面试质量下降，提升面试官满意度",
        aiScore: 7.9
      },
      {
        type: "prediction",
        title: "🔮 AI人才流失预测",
        description: "基于历史数据分析，预测未来3个月内可能流失的关键候选人，建议提前制定挽留策略",
        priority: "high",
        confidence: 87,
        impact: "降低人才流失率，节省招聘成本",
        aiScore: 8.5
      },
      {
        type: "opportunity",
        title: "💡 AI技能缺口发现",
        description: "智能分析发现React和系统设计技能存在明显缺口，建议调整面试策略和人才培养计划",
        priority: "medium",
        confidence: 91,
        impact: "填补技能缺口，提升团队整体能力",
        aiScore: 8.1
      },
      {
        type: "optimization",
        title: "⚡ 面试流程AI优化",
        description: "通过AI分析最优面试顺序和时间安排，预计可将候选人体验提升25%，面试成功率提升12%",
        priority: "medium",
        confidence: 88,
        impact: "提升候选人满意度和录用成功率",
        aiScore: 8.4
      }
    ],
    // AI智能预测和分析
    aiPredictions: {
      nextMonthHiring: {
        predicted: 42,
        confidence: 89,
        trend: "up",
        factors: ["市场需求增加", "技术栈匹配度提升", "薪资竞争力增强"]
      },
      skillGrowth: [
        { skill: "React", growthRate: 15, demand: "high", recommendation: "加强筛选" },
        { skill: "AI/ML", growthRate: 35, demand: "very_high", recommendation: "紧急招聘" },
        { skill: "系统设计", growthRate: 8, demand: "medium", recommendation: "稳步培养" }
      ],
      riskAssessment: {
        overallRisk: "low",
        factors: [
          { factor: "面试质量", risk: "low", score: 8.5 },
          { factor: "候选人满意度", risk: "medium", score: 7.2 },
          { factor: "时间效率", risk: "medium", score: 7.8 }
        ]
      }
    },
    // 面试官AI深度分析
    interviewerAiAnalysis: {
      performanceMatrix: [
        { name: "张三(HR)", technical: 6.5, communication: 9.2, efficiency: 8.8, growth: 7.5 },
        { name: "李四(技术)", technical: 9.1, communication: 7.3, efficiency: 8.5, growth: 8.2 },
        { name: "王五(技术)", technical: 8.9, communication: 7.8, efficiency: 8.1, growth: 7.9 },
        { name: "赵六(VP)", technical: 7.5, communication: 8.7, efficiency: 9.0, growth: 8.8 }
      ],
      recommendations: [
        { interviewer: "张三(HR)", action: "技术培训", priority: "medium", timeline: "2个月" },
        { interviewer: "李四(技术)", action: "沟通技巧提升", priority: "high", timeline: "1个月" },
        { interviewer: "王五(技术)", action: "评分标准统一", priority: "medium", timeline: "2周" },
        { interviewer: "赵六(VP)", action: "增加面试频次", priority: "low", timeline: "持续" }
      ]
    }
  };

  const getSkillTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return (
          <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
        );
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return <Target className="h-5 w-5 text-blue-500" />;
      case "trend":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "prediction":
        return <Brain className="h-5 w-5 text-purple-500" />;
      case "opportunity":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case "optimization":
        return <Zap className="h-5 w-5 text-indigo-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-gray-500" />;
    }
  };

  // AI分析触发
  const triggerAiAnalysis = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => setIsAiAnalyzing(false), 3000);
  };

  // 面试官详细分析
  const handleInterviewerClick = (interviewerId: string) => {
    setSelectedInterviewer(interviewerId);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="badge badge-danger">高优先级</span>;
      case "medium":
        return <span className="badge badge-warning">中优先级</span>;
      case "low":
        return <span className="badge badge-success">低优先级</span>;
      default:
        return <span className="badge badge-gray">未知</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI增强页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 text-blue-600 mr-3" />
            🤖 AI智能数据分析
          </h1>
          <p className="mt-2 text-sm text-gray-600 flex items-center">
            <Sparkles className="h-4 w-4 mr-1" />
            基于机器学习算法的全方位面试数据洞察与预测分析
            <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
              AI驱动
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            className="select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="quarter">本季度</option>
            <option value="year">本年</option>
          </select>
          <button className="btn btn-secondary">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </button>
          <button className="btn btn-primary">
            <FileText className="h-4 w-4 mr-2" />
            导出报告
          </button>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">总面试次数</p>
              <p className="text-2xl font-bold text-gray-900">
                {analysisData.summary.totalInterviews}
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% vs 上月
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">平均分数</p>
              <p className="text-2xl font-bold text-gray-900">
                {analysisData.summary.averageScore}
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.3 vs 上月
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">通过率</p>
              <p className="text-2xl font-bold text-gray-900">
                {analysisData.summary.passRate}%
              </p>
              <p className="text-sm text-red-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                -2% vs 上月
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">平均时长</p>
              <p className="text-2xl font-bold text-gray-900">
                {analysisData.summary.averageDuration}分钟
              </p>
              <p className="text-sm text-gray-600">标准范围内</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 面试类型分析 */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            面试轮次分析
          </h3>
          <div className="space-y-4">
            {analysisData.interviewTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {type.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {type.count} 场
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>通过率</span>
                        <span>{type.passRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${type.passRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {type.avgScore}
                      </div>
                      <div className="text-xs text-gray-500">平均分</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 面试官效率分析 */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">面试官表现</h3>
          <div className="space-y-4">
            {analysisData.interviewers.map((interviewer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 text-xs font-medium">
                      {interviewer.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {interviewer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {interviewer.interviews} 场面试
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {interviewer.avgScore}
                  </div>
                  <div className="text-xs text-gray-500">平均分</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    {interviewer.efficiency}%
                  </div>
                  <div className="text-xs text-gray-500">效率</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 技能评估分析 */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">技能评估分析</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  技能
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  平均分数
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  难度等级
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  趋势
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analysisData.skills.map((skill, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">
                      {skill.skill}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">
                        {skill.avgScore}
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(skill.avgScore / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge ${
                        skill.difficulty === "high"
                          ? "badge-danger"
                          : skill.difficulty === "medium"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {skill.difficulty === "high"
                        ? "困难"
                        : skill.difficulty === "medium"
                        ? "中等"
                        : "简单"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getSkillTrendIcon(skill.trend)}
                      <span className="ml-2 text-sm text-gray-500">
                        {skill.trend === "up"
                          ? "上升"
                          : skill.trend === "down"
                          ? "下降"
                          : "稳定"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI 洞察和建议 */}
      <div className="card p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">AI 洞察和建议</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysisData.aiInsights.map((insight, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  {getInsightIcon(insight.type)}
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {insight.title}
                  </span>
                </div>
                {getPriorityBadge(insight.priority)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 趋势分析图表区域 - 这里可以集成图表库 */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">面试趋势</h3>
        <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              图表组件位置 - 可集成 Chart.js, D3.js 等图表库
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewAnalysis;
