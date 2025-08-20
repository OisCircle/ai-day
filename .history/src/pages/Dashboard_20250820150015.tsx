import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Lightbulb,
  MessageSquare,
  PieChart,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import candidatesData from "../data/candidates.json";
import interviewRoundsData from "../data/interviewRounds.json";
import { Candidate, InterviewRound } from "../types";

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  changeType: "positive" | "negative" | "neutral";
}

// AI分析结果接口
interface AIInsight {
  id: string;
  type: "prediction" | "recommendation" | "alert" | "trend";
  title: string;
  description: string;
  confidence: number;
  priority: "high" | "medium" | "low";
  action?: string;
}

interface AIAnalytics {
  candidateQualityScore: number;
  averageInterviewTime: number;
  successPredictionAccuracy: number;
  topSkillsInDemand: string[];
  interviewBottlenecks: string[];
  predictedHiringSuccess: number;
}

const Dashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [interviewRounds, setInterviewRounds] = useState<InterviewRound[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [aiAnalytics, setAiAnalytics] = useState<AIAnalytics | null>(null);

  useEffect(() => {
    setCandidates(candidatesData as Candidate[]);
    setInterviewRounds(interviewRoundsData as InterviewRound[]);
    
    // 模拟AI分析数据
    generateAIInsights();
    generateAIAnalytics();
  }, []);

  // 生成AI洞察
  const generateAIInsights = () => {
    const insights: AIInsight[] = [
      {
        id: "ai1",
        type: "prediction",
        title: "招聘成功率预测",
        description: "基于当前面试数据，本月成功招聘概率为85%，比上月提升12%",
        confidence: 92,
        priority: "high",
        action: "建议重点关注技术面试质量"
      },
      {
        id: "ai2", 
        type: "recommendation",
        title: "候选人匹配优化",
        description: "发现3位高匹配度候选人，建议优先安排面试",
        confidence: 88,
        priority: "medium",
        action: "查看推荐候选人列表"
      },
      {
        id: "ai3",
        type: "alert", 
        title: "面试流程瓶颈",
        description: "技术面试环节平均用时超标25%，可能影响候选人体验",
        confidence: 95,
        priority: "high",
        action: "优化面试流程"
      },
      {
        id: "ai4",
        type: "trend",
        title: "技能需求趋势",
        description: "React、TypeScript需求量上升40%，建议调整招聘策略",
        confidence: 87,
        priority: "medium"
      }
    ];
    setAiInsights(insights);
  };

  // 生成AI分析数据
  const generateAIAnalytics = () => {
    const analytics: AIAnalytics = {
      candidateQualityScore: 7.8,
      averageInterviewTime: 65,
      successPredictionAccuracy: 89,
      topSkillsInDemand: ["React", "TypeScript", "Node.js", "Python", "Golang"],
      interviewBottlenecks: ["技术面试时间过长", "候选人反馈不及时", "面试官档期冲突"],
      predictedHiringSuccess: 85
    };
    setAiAnalytics(analytics);
  };

  // 统计数据计算
  const totalCandidates = candidates.length;
  const interviewingCandidates = candidates.filter(
    (c) => c.status === "interviewing"
  ).length;
  const completedInterviews = candidates.filter(
    (c) => c.status === "completed"
  ).length;
  const pendingScreening = candidates.filter(
    (c) => c.status === "screening"
  ).length;

  // AI驱动的高级统计
  const calculateAdvancedMetrics = () => {
    const completedRounds = interviewRounds.filter(r => r.status === "completed");
    const averageScore = completedRounds.reduce((acc, round) => 
      acc + (round.evaluation?.overallScore || 0), 0) / completedRounds.length || 0;
    
    const passRate = completedRounds.filter(r => 
      r.recommendation === "pass").length / completedRounds.length * 100 || 0;
    
    return {
      averageScore: averageScore.toFixed(1),
      passRate: passRate.toFixed(0),
      totalInterviews: completedRounds.length
    };
  };

  const metrics = calculateAdvancedMetrics();

  const stats: StatCard[] = [
    {
      title: "AI质量评分",
      value: `${aiAnalytics?.candidateQualityScore.toFixed(1) || "7.8"}/10`,
      change: "+0.8",
      icon: Brain,
      changeType: "positive",
    },
    {
      title: "预测成功率",
      value: `${aiAnalytics?.predictedHiringSuccess || 85}%`,
      change: "+12%",
      icon: Target,
      changeType: "positive",
    },
    {
      title: "面试通过率",
      value: `${metrics.passRate}%`,
      change: "+8%",
      icon: CheckCircle,
      changeType: "positive",
    },
    {
      title: "平均面试时长",
      value: `${aiAnalytics?.averageInterviewTime || 65}分钟`,
      change: "-15分钟",
      icon: Clock,
      changeType: "positive",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      type: "interview_completed",
      message: "陈小明 完成了技术一面",
      time: "2小时前",
      status: "success",
    },
    {
      id: "2",
      type: "interview_scheduled",
      message: "刘小红 的HR面试已安排",
      time: "4小时前",
      status: "info",
    },
    {
      id: "3",
      type: "report_generated",
      message: "生成了技术面试报告",
      time: "6小时前",
      status: "success",
    },
    {
      id: "4",
      type: "candidate_applied",
      message: "新候选人王小强提交申请",
      time: "1天前",
      status: "info",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
          <p className="mt-1 text-sm text-gray-500">
            欢迎使用AI面试系统，这里是您的工作概览
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-secondary">
            <FileText className="h-4 w-4 mr-2" />
            导出报告
          </button>
          <button className="btn btn-primary">
            <Brain className="h-4 w-4 mr-2" />
            AI 助手
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : stat.changeType === "negative"
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
                        <span className="sr-only">
                          {stat.changeType === "positive" ? "增长" : "下降"}
                        </span>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近活动 */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                最近活动
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivities.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivities.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                activity.status === "success"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                            >
                              {activity.status === "success" ? (
                                <CheckCircle className="h-5 w-5 text-white" />
                              ) : (
                                <Clock className="h-5 w-5 text-white" />
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {activity.message}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">快速操作</h3>
            <div className="space-y-3">
              <button className="w-full btn btn-primary justify-start">
                <Users className="h-4 w-4 mr-3" />
                添加新候选人
              </button>
              <button className="w-full btn btn-secondary justify-start">
                <Calendar className="h-4 w-4 mr-3" />
                安排面试
              </button>
              <button className="w-full btn btn-secondary justify-start">
                <Brain className="h-4 w-4 mr-3" />
                生成面试问题
              </button>
              <button className="w-full btn btn-secondary justify-start">
                <FileText className="h-4 w-4 mr-3" />
                查看面试报告
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">AI 洞察</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-800">
                      本周技术面试通过率为78%，比上周提升了5%
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-green-800">
                      候选人整体技术水平呈上升趋势，建议适当提高面试标准
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
