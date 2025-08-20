import {
  AlertTriangle,
  Award,
  Brain,
  CheckCircle,
  Clock,
  Code,
  Crown,
  Download,
  Eye,
  MessageSquare,
  RefreshCw,
  Server,
  Settings,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import candidatesData from "../data/candidates.json";
import jobDescriptionsData from "../data/jobDescriptions.json";
import { Candidate, JobDescription } from "../types";

interface AIQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  expectedAnswer: string;
  followUps: string[];
  evaluationCriteria: string[];
  timeLimit: number;
  aiRating: number;
}

interface InterviewRoundQuestions {
  type: "hr" | "tech_1" | "tech_2" | "vp";
  title: string;
  description: string;
  focus: string[];
  questions: AIQuestion[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const AIInterviewQuestions: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null);
  const [selectedRound, setSelectedRound] = useState<string>("hr");
  const [isGenerating, setIsGenerating] = useState(false);
  const [interviewRounds, setInterviewRounds] = useState<
    InterviewRoundQuestions[]
  >([]);

  useEffect(() => {
    // 加载张伟的候选人数据
    const candidates = candidatesData as Candidate[];
    const jobs = jobDescriptionsData as JobDescription[];

    const candidate = candidates.find((c) => c.id === "c003"); // 张伟
    const job = jobs.find((j) => j.id === "job003"); // Golang 职位

    if (candidate && job) {
      setSelectedCandidate(candidate);
      setSelectedJob(job);
      generateAIQuestions(candidate, job);
    }
  }, []);

  const generateAIQuestions = (candidate: Candidate, job: JobDescription) => {
    const rounds: InterviewRoundQuestions[] = [
      {
        type: "hr",
        title: "HR 面试",
        description: "评估候选人的软实力、文化匹配度和职业规划",
        focus: ["沟通能力", "团队协作", "职业发展", "企业文化", "工作动机"],
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        questions: [
          {
            id: "hr_1",
            question:
              "请介绍一下你的职业发展历程，特别是从美团到字节跳动的转换过程中，你是如何规划自己的技术成长路径的？",
            category: "职业发展",
            difficulty: "medium",
            tags: ["职业规划", "自我认知", "技术成长"],
            expectedAnswer:
              "应该体现清晰的职业规划思路，技术深度的追求，以及对不同公司文化的适应能力",
            followUps: [
              "在字节跳动的三年里，你认为自己最大的成长是什么？",
              "为什么选择离开字节跳动？",
              "对于未来5年的职业发展有什么规划？",
            ],
            evaluationCriteria: [
              "职业规划的清晰度和合理性",
              "自我反思和学习能力",
              "对技术发展趋势的理解",
            ],
            timeLimit: 8,
            aiRating: 8.5,
          },
          {
            id: "hr_2",
            question:
              "描述一次你在团队中解决冲突或分歧的经历，特别是在技术选型或架构设计方面产生争议时，你是如何处理的？",
            category: "团队协作",
            difficulty: "hard",
            tags: ["团队协作", "冲突解决", "沟通技巧"],
            expectedAnswer:
              "应展现出成熟的沟通技巧、换位思考能力和寻求双赢解决方案的思维",
            followUps: [
              "如果你的技术方案被团队否决，你会如何应对？",
              "作为技术专家，如何向非技术同事解释复杂的技术问题？",
            ],
            evaluationCriteria: [
              "沟通协调能力",
              "情商和处理人际关系的能力",
              "解决问题的方法论",
            ],
            timeLimit: 10,
            aiRating: 9.0,
          },
          {
            id: "hr_3",
            question:
              "在高强度的项目开发过程中，你如何平衡代码质量和交付速度？当业务方要求快速上线而技术债务积累时，你会如何权衡？",
            category: "工作态度",
            difficulty: "hard",
            tags: ["工作压力", "决策能力", "质量意识"],
            expectedAnswer:
              "体现出对技术债务的深刻理解，以及在业务需求和技术质量之间寻求平衡的智慧",
            followUps: [
              "你如何说服业务方投入时间来重构和优化代码？",
              "在项目紧急情况下，你的决策原则是什么？",
            ],
            evaluationCriteria: [
              "对技术质量的重视程度",
              "平衡业务需求和技术需求的能力",
              "长远思考和风险意识",
            ],
            timeLimit: 8,
            aiRating: 8.8,
          },
        ],
      },
      {
        type: "tech_1",
        title: "技术一面",
        description: "深度考察 Golang 技术功底、DDD 理解和系统设计能力",
        focus: ["Golang核心", "DDD设计", "微服务", "性能优化", "代码质量"],
        icon: Code,
        color: "text-green-600",
        bgColor: "bg-green-50",
        questions: [
          {
            id: "tech1_1",
            question:
              "请详细阐述 Golang 的 goroutine 调度器（GMP 模型）的工作原理，以及它如何解决传统线程模型的性能问题。在你的项目中，你是如何优化 goroutine 的使用来提升系统性能的？",
            category: "Golang深度",
            difficulty: "hard",
            tags: ["GMP模型", "并发编程", "性能优化", "调度器"],
            expectedAnswer:
              "应深入讲解GMP模型的核心机制，包括G、M、P的作用，work stealing算法，以及具体的优化实践",
            followUps: [
              "什么情况下会发生 goroutine 泄露？如何检测和解决？",
              "channel 的底层实现原理是什么？select 语句是如何工作的？",
              "在高并发场景下，如何设计 goroutine pool 来控制资源消耗？",
            ],
            evaluationCriteria: [
              "对Golang并发模型的深度理解",
              "实际项目中的性能优化经验",
              "问题排查和解决能力",
            ],
            timeLimit: 20,
            aiRating: 9.5,
          },
          {
            id: "tech1_2",
            question:
              "基于你在字节跳动实施的 DDD 重构项目，请详细描述领域驱动设计的核心概念和实践。如何识别和划分领域边界？聚合根的设计原则是什么？事件溯源和 CQRS 模式在你的项目中是如何应用的？",
            category: "DDD架构",
            difficulty: "hard",
            tags: ["DDD", "聚合根", "事件溯源", "CQRS", "领域建模"],
            expectedAnswer:
              "应体现对DDD理论的深刻理解和丰富的实践经验，包括具体的设计决策和权衡考虑",
            followUps: [
              "如何处理跨聚合的事务一致性问题？",
              "在微服务架构中，如何确定服务边界和领域边界的对应关系？",
              "事件溯源的存储模型设计和快照机制如何实现？",
            ],
            evaluationCriteria: [
              "DDD理论知识的掌握程度",
              "架构设计的实践经验",
              "复杂业务问题的建模能力",
            ],
            timeLimit: 25,
            aiRating: 9.8,
          },
          {
            id: "tech1_3",
            question:
              "设计一个能够支持每秒50万QPS的订单处理系统。请从数据库选型、缓存策略、消息队列、负载均衡等多个维度来阐述你的技术方案。特别说明如何保证系统的一致性、可用性和分区容错性。",
            category: "系统设计",
            difficulty: "hard",
            tags: ["高并发", "系统设计", "分布式", "CAP理论", "性能优化"],
            expectedAnswer:
              "需要展现出完整的系统设计思路，包括技术选型的权衡、性能瓶颈的分析和解决方案",
            followUps: [
              "如何设计分布式ID生成策略？",
              "数据库分库分表的策略和路由规则如何设计？",
              "如何实现最终一致性？补偿机制如何设计？",
            ],
            evaluationCriteria: [
              "系统设计的全面性和深度",
              "对分布式系统理论的理解",
              "实际项目经验的体现",
            ],
            timeLimit: 30,
            aiRating: 9.6,
          },
          {
            id: "tech1_4",
            question:
              "在 Golang 中如何进行内存管理和垃圾回收优化？请结合你的项目经验，说明如何通过内存分析工具定位内存泄露问题，以及如何设计对GC友好的数据结构。",
            category: "性能调优",
            difficulty: "medium",
            tags: ["内存管理", "GC优化", "性能分析", "pprof"],
            expectedAnswer:
              "应涵盖Golang内存模型、GC算法、性能分析工具的使用和具体的优化实践",
            followUps: [
              "sync.Pool 的使用场景和注意事项？",
              "如何减少GC压力？有哪些具体的编程技巧？",
              "unsafe 包的使用场景和风险控制？",
            ],
            evaluationCriteria: [
              "内存管理知识的深度",
              "性能调优的实践经验",
              "问题诊断和解决能力",
            ],
            timeLimit: 15,
            aiRating: 8.5,
          },
        ],
      },
      {
        type: "tech_2",
        title: "技术二面",
        description: "考察系统思维、技术领导力和复杂问题解决能力",
        focus: ["系统思维", "技术领导力", "架构演进", "团队协作", "创新能力"],
        icon: Server,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        questions: [
          {
            id: "tech2_1",
            question:
              "作为技术负责人，你如何制定团队的技术发展路线图？在推进 DDD 架构重构时，如何说服团队和管理层投入资源？如何评估重构的ROI？",
            category: "技术管理",
            difficulty: "hard",
            tags: ["技术规划", "团队管理", "决策能力", "ROI评估"],
            expectedAnswer:
              "展现技术leader的思维方式，包括战略规划、团队说服、价值量化等能力",
            followUps: [
              "如何平衡业务需求的紧急性和技术债务的重要性？",
              "团队成员技术能力参差不齐时，如何制定培训计划？",
              "如何建立技术决策的评审机制？",
            ],
            evaluationCriteria: [
              "技术战略思维",
              "团队领导和影响力",
              "商业价值意识",
            ],
            timeLimit: 15,
            aiRating: 9.2,
          },
          {
            id: "tech2_2",
            question:
              "在微服务架构演进过程中，你遇到过哪些挑战？如何处理服务间的依赖关系？如何设计服务的容错和降级策略？分布式追踪和监控体系是如何建设的？",
            category: "架构演进",
            difficulty: "hard",
            tags: ["微服务", "容错设计", "分布式追踪", "监控体系"],
            expectedAnswer:
              "体现对微服务架构的深入理解和丰富的实践经验，包括遇到的坑和解决方案",
            followUps: [
              "如何处理分布式事务？Saga模式在你的项目中如何应用？",
              "服务网格（Service Mesh）技术你了解吗？适用场景是什么？",
              "如何设计API网关的限流和熔断策略？",
            ],
            evaluationCriteria: [
              "微服务架构的实践深度",
              "分布式系统的理解程度",
              "问题解决的系统性思维",
            ],
            timeLimit: 20,
            aiRating: 9.4,
          },
          {
            id: "tech2_3",
            question:
              "面对突发的生产事故（比如双十一期间系统crash），你作为技术负责人会如何应对？请描述完整的应急响应流程。如何进行事后复盘和系统改进？",
            category: "应急处理",
            difficulty: "hard",
            tags: ["应急响应", "故障处理", "团队协调", "复盘改进"],
            expectedAnswer:
              "展现在高压环境下的决策能力、团队协调能力和持续改进的思维",
            followUps: [
              "如何在不确定原因的情况下快速止损？",
              "事故期间如何与业务方、运营团队协调沟通？",
              "如何建立可观测性体系来提前发现潜在问题？",
            ],
            evaluationCriteria: [
              "应急处理的冷静和决策能力",
              "团队协调和沟通能力",
              "持续改进的系统性思维",
            ],
            timeLimit: 18,
            aiRating: 9.0,
          },
          {
            id: "tech2_4",
            question:
              "你如何看待新技术的引入？比如 Go 的泛型、Kubernetes、Istio 等新技术，你会如何评估是否在项目中采用？有哪些决策维度？",
            category: "技术决策",
            difficulty: "medium",
            tags: ["技术选型", "创新能力", "风险评估", "技术趋势"],
            expectedAnswer:
              "体现对新技术的敏感度和理性的评估能力，平衡创新和稳定性",
            followUps: [
              "如何在保证系统稳定的前提下进行技术创新？",
              "团队成员对新技术接受度不高时如何推进？",
              "如何建立技术调研和预研的机制？",
            ],
            evaluationCriteria: [
              "技术敏感度和判断力",
              "风险评估能力",
              "技术推广的方法论",
            ],
            timeLimit: 12,
            aiRating: 8.7,
          },
        ],
      },
      {
        type: "vp",
        title: "VP 面试",
        description: "评估候选人的综合素质、业务理解和战略思维",
        focus: ["战略思维", "业务洞察", "团队管理", "创新能力", "文化匹配"],
        icon: Crown,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        questions: [
          {
            id: "vp_1",
            question:
              "从技术角度看，你认为当前互联网行业面临哪些挑战和机遇？作为资深技术专家，你如何看待技术驱动业务创新的价值？请结合你的经验谈谈技术如何赋能业务增长。",
            category: "战略思维",
            difficulty: "hard",
            tags: ["行业洞察", "技术战略", "业务价值", "创新思维"],
            expectedAnswer:
              "展现对行业趋势的深刻洞察和技术价值的理解，体现战略思维和大局观",
            followUps: [
              "在AI大模型时代，传统软件开发模式会发生哪些变化？",
              "如何平衡技术创新投入和短期业务目标？",
              "技术团队如何更好地理解和支撑业务？",
            ],
            evaluationCriteria: [
              "行业认知的深度和前瞻性",
              "技术商业价值的理解",
              "战略思维和全局观",
            ],
            timeLimit: 20,
            aiRating: 9.3,
          },
          {
            id: "vp_2",
            question:
              "如果让你负责一个50人的技术团队，你会如何设计组织架构和管理体系？如何建立技术文化？如何平衡团队成员的个人成长和公司业务需求？",
            category: "团队管理",
            difficulty: "hard",
            tags: ["组织管理", "团队建设", "人才培养", "文化建设"],
            expectedAnswer:
              "体现管理思维和人才培养理念，展现建设高效技术团队的能力",
            followUps: [
              "如何处理高绩效但难管理的技术专家？",
              "技术团队的KPI体系应该如何设计？",
              "如何让技术团队更好地理解业务价值？",
            ],
            evaluationCriteria: [
              "管理理念的成熟度",
              "人才培养的系统性思考",
              "团队文化建设能力",
            ],
            timeLimit: 18,
            aiRating: 9.1,
          },
          {
            id: "vp_3",
            question:
              "面对快速变化的市场环境，技术团队应该如何保持敏捷性和适应性？你如何看待技术债务和快速迭代之间的平衡？在资源有限的情况下，如何做技术投入的优先级排序？",
            category: "决策能力",
            difficulty: "hard",
            tags: ["敏捷开发", "资源配置", "优先级管理", "决策权衡"],
            expectedAnswer: "展现在复杂环境下的决策能力和资源配置的智慧",
            followUps: [
              "如何向CEO汇报技术团队的价值和投入产出？",
              "技术规划和业务规划不一致时如何协调？",
              "如何建立技术投入的评估和决策机制？",
            ],
            evaluationCriteria: [
              "复杂环境下的决策能力",
              "资源配置的系统性思考",
              "向上管理和跨部门协作能力",
            ],
            timeLimit: 15,
            aiRating: 8.9,
          },
        ],
      },
    ];

    setInterviewRounds(rounds);
  };

  const handleGenerateNewQuestions = async () => {
    setIsGenerating(true);
    // 模拟AI生成新问题的过程
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 这里可以调用真实的AI服务来生成新问题
    // const newQuestions = await aiService.generateQuestions(selectedCandidate, selectedJob, selectedRound);

    setIsGenerating(false);
  };

  const getCurrentRound = () => {
    return interviewRounds.find((round) => round.type === selectedRound);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAIRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 text-yellow-400 fill-current opacity-50" />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="h-4 w-4 text-gray-300" />
          ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (!selectedCandidate || !selectedJob) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-500">加载候选人信息中...</p>
        </div>
      </div>
    );
  }

  const currentRound = getCurrentRound();

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-2xl"></div>
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                  AI 智能面试题库
                </h1>
                <p className="mt-2 text-gray-600 flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
                  基于候选人背景和岗位需求智能生成专业面试题
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleGenerateNewQuestions}
                disabled={isGenerating}
                className="btn btn-secondary relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 group-hover:from-purple-600/20 group-hover:to-blue-600/20 transition-all"></div>
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 mr-2 relative z-10 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 mr-2 relative z-10" />
                )}
                <span className="relative z-10">
                  {isGenerating ? "生成中..." : "重新生成"}
                </span>
              </button>
              <button className="btn btn-primary bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0">
                <Download className="h-4 w-4 mr-2" />
                导出题库
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：候选人信息 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 候选人基本信息 */}
          <div className="card p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {selectedCandidate.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedCandidate.name}
                </h3>
                <p className="text-gray-600">{selectedJob.title}</p>
                <div className="flex items-center mt-2">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-500">5年 Golang 经验</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">核心技能</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.resume.skills.technical
                    .slice(0, 6)
                    .map((skill, index) => (
                      <span key={index} className="badge badge-primary">
                        {skill}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">工作经历</h4>
                <div className="space-y-3">
                  {selectedCandidate.resume.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-900">
                          {exp.position}
                        </h5>
                        <span className="text-xs text-gray-500">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">项目亮点</h4>
                <div className="space-y-2">
                  {selectedCandidate.resume.projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <h5 className="text-sm font-medium text-gray-900">
                        {project.name}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI分析洞察 */}
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                AI 候选人画像
              </h3>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    技术优势
                  </span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 5年 Golang 实战经验，技术功底扎实</li>
                  <li>• DDD 架构设计经验丰富</li>
                  <li>• 高并发系统优化能力突出</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    匹配度分析
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">岗位匹配度</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-blue-700">95%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    关注点
                  </span>
                </div>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• 管理经验需要进一步了解</li>
                  <li>• 跨团队协作能力待评估</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：面试题内容 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 面试轮次选择 */}
          <div className="card p-4">
            <div className="flex items-center space-x-4 overflow-x-auto">
              {interviewRounds.map((round) => {
                const Icon = round.icon;
                const isActive = selectedRound === round.type;
                return (
                  <button
                    key={round.type}
                    onClick={() => setSelectedRound(round.type)}
                    className={`flex-shrink-0 flex items-center space-x-3 px-6 py-3 rounded-xl transition-all ${
                      isActive
                        ? `${round.bgColor} ${round.color} border-2 border-opacity-30`
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">{round.title}</div>
                      <div className="text-xs opacity-75">
                        {round.questions.length} 道题
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 当前轮次信息 */}
          {currentRound && (
            <>
              <div
                className={`card p-6 border-l-4 ${
                  currentRound.type === "hr"
                    ? "border-blue-500"
                    : currentRound.type === "tech_1"
                    ? "border-green-500"
                    : currentRound.type === "tech_2"
                    ? "border-purple-500"
                    : "border-orange-500"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className={`text-xl font-bold mb-2 ${currentRound.color}`}
                    >
                      {currentRound.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {currentRound.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">
                        评估重点：
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentRound.focus.map((focus, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${currentRound.bgColor}`}>
                    <currentRound.icon
                      className={`h-6 w-6 ${currentRound.color}`}
                    />
                  </div>
                </div>
              </div>

              {/* 面试题列表 */}
              <div className="space-y-4">
                {currentRound.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="card p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                            Q{index + 1}
                          </span>
                          <span
                            className={`badge ${getDifficultyColor(
                              question.difficulty
                            )}`}
                          >
                            {question.difficulty === "easy"
                              ? "简单"
                              : question.difficulty === "medium"
                              ? "中等"
                              : "困难"}
                          </span>
                          <span className="badge badge-gray">
                            {question.category}
                          </span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {question.timeLimit}分钟
                            </span>
                          </div>
                        </div>

                        <h4 className="text-lg font-medium text-gray-900 mb-3 leading-relaxed">
                          {question.question}
                        </h4>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">
                            期望回答要点：
                          </h5>
                          <p className="text-sm text-gray-600">
                            {question.expectedAnswer}
                          </p>
                        </div>

                        {question.followUps.length > 0 && (
                          <div className="bg-blue-50 rounded-lg p-4 mb-4">
                            <h5 className="text-sm font-medium text-blue-900 mb-2">
                              可能的追问：
                            </h5>
                            <ul className="text-sm text-blue-700 space-y-1">
                              {question.followUps.map(
                                (followUp, followIndex) => (
                                  <li
                                    key={followIndex}
                                    className="flex items-start"
                                  >
                                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                    {followUp}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="bg-green-50 rounded-lg p-4">
                          <h5 className="text-sm font-medium text-green-900 mb-2">
                            评估标准：
                          </h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            {question.evaluationCriteria.map(
                              (criteria, criteriaIndex) => (
                                <li
                                  key={criteriaIndex}
                                  className="flex items-start"
                                >
                                  <CheckCircle className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                                  {criteria}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3 ml-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600 mb-1">
                            AI 评分
                          </div>
                          {getAIRatingStars(question.aiRating)}
                        </div>

                        <div className="flex space-x-2">
                          <button className="btn btn-sm btn-secondary">
                            <Eye className="h-3 w-3" />
                          </button>
                          <button className="btn btn-sm btn-secondary">
                            <MessageSquare className="h-3 w-3" />
                          </button>
                          <button className="btn btn-sm btn-secondary">
                            <Settings className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInterviewQuestions;
