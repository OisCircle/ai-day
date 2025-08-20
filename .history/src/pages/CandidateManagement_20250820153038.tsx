import {
  Award,
  Brain,
  Briefcase,
  Calendar,
  Edit,
  Eye,
  Filter,
  Lightbulb,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import candidatesData from "../data/candidates.json";
import jobDescriptionsData from "../data/jobDescriptions.json";
import { Candidate, JobDescription } from "../types";

// AI分析接口
interface CandidateAIAnalysis {
  id: string;
  overallScore: number; // 0-10
  potentialRank: "high" | "medium" | "low";
  skillMatchScore: number; // 0-100
  cultureMatchScore: number; // 0-100
  experienceScore: number; // 0-100
  educationScore: number; // 0-100
  growthPotential: number; // 0-100
  strengths: string[];
  concerns: string[];
  recommendations: string[];
  predictedSuccess: number; // 0-100
  riskFactors: string[];
}

// 扩展候选人类型包含AI分析
interface EnhancedCandidate extends Candidate {
  aiAnalysis: CandidateAIAnalysis;
}

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState<EnhancedCandidate[]>([]);
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPotential, setSelectedPotential] = useState<string>("all");
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(
    null
  );
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showOnlyHighPotential, setShowOnlyHighPotential] = useState(false);

  // AI分析生成函数
  const generateAIAnalysis = (candidate: Candidate, job: JobDescription): CandidateAIAnalysis => {
    const skills = candidate.resume.skills.technical;
    const experience = candidate.resume.experience;
    
    // 技能匹配评分
    const requiredSkills = job?.skills.technical || [];
    const matchingSkills = skills.filter(skill => 
      requiredSkills.some(reqSkill => 
        reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(reqSkill.toLowerCase())
      )
    );
    const skillMatchScore = Math.min(100, (matchingSkills.length / Math.max(requiredSkills.length, 1)) * 100 + Math.random() * 20);

    // 经验评分 (基于年限和大厂经验)
    const totalExperience = experience.reduce((acc, exp) => {
      const years = parseFloat(exp.duration.split(' - ')[1]) - parseFloat(exp.duration.split(' - ')[0]);
      return acc + (isNaN(years) ? 2 : years);
    }, 0);
    const bigCompanies = ['字节跳动', '腾讯', '阿里', '美团', '百度', 'Google', 'Microsoft', 'Apple'];
    const hasBigCompanyExp = experience.some(exp => 
      bigCompanies.some(company => exp.company.includes(company))
    );
    const experienceScore = Math.min(100, (totalExperience * 20) + (hasBigCompanyExp ? 30 : 0) + Math.random() * 15);

    // 教育背景评分
    const topUniversities = ['清华', '北大', '北理工', '北航', '复旦', '上交', 'MIT', 'Stanford'];
    const hasTopEducation = candidate.resume.education.some(edu => 
      topUniversities.some(uni => edu.school.includes(uni))
    );
    const educationScore = hasTopEducation ? 85 + Math.random() * 15 : 60 + Math.random() * 25;

    // 文化匹配度 (模拟)
    const cultureMatchScore = 70 + Math.random() * 25;

    // 成长潜力
    const growthPotential = Math.min(100, (skillMatchScore * 0.3 + experienceScore * 0.3 + educationScore * 0.4));

    // 综合评分
    const overallScore = (skillMatchScore * 0.3 + experienceScore * 0.25 + educationScore * 0.2 + cultureMatchScore * 0.25) / 10;

    // 潜力等级
    let potentialRank: "high" | "medium" | "low";
    if (overallScore >= 8.5) potentialRank = "high";
    else if (overallScore >= 7) potentialRank = "medium";
    else potentialRank = "low";

    // 预测成功率
    const predictedSuccess = Math.min(95, overallScore * 10 + Math.random() * 10);

    // 生成优势和建议
    const strengths: string[] = [];
    const concerns: string[] = [];
    const recommendations: string[] = [];
    const riskFactors: string[] = [];

    if (skillMatchScore > 80) {
      strengths.push("技能匹配度高");
      strengths.push("技术实力突出");
    } else if (skillMatchScore < 60) {
      concerns.push("技能匹配度待提升");
      recommendations.push("建议增加相关技术培训");
    }

    if (hasBigCompanyExp) {
      strengths.push("大厂工作经验丰富");
      strengths.push("项目经验valuable");
    }

    if (hasTopEducation) {
      strengths.push("教育背景优秀");
    }

    if (totalExperience > 5) {
      strengths.push("工作经验丰富");
    } else if (totalExperience < 2) {
      riskFactors.push("工作经验相对较少");
    }

    if (potentialRank === "high") {
      recommendations.push("优先安排面试");
      recommendations.push("考虑快速通道");
    }

    return {
      id: candidate.id,
      overallScore: Number(overallScore.toFixed(1)),
      potentialRank,
      skillMatchScore: Number(skillMatchScore.toFixed(0)),
      cultureMatchScore: Number(cultureMatchScore.toFixed(0)),
      experienceScore: Number(experienceScore.toFixed(0)),
      educationScore: Number(educationScore.toFixed(0)),
      growthPotential: Number(growthPotential.toFixed(0)),
      strengths,
      concerns,
      recommendations,
      predictedSuccess: Number(predictedSuccess.toFixed(0)),
      riskFactors,
    };
  };

  useEffect(() => {
    const rawCandidates = candidatesData as Candidate[];
    const jobsList = jobDescriptionsData as JobDescription[];
    setJobs(jobsList);

    // 为每个候选人生成AI分析
    const enhancedCandidates = rawCandidates.map(candidate => {
      const job = jobsList.find(j => j.id === candidate.appliedPosition);
      const aiAnalysis = generateAIAnalysis(candidate, job || jobsList[0]);
      
      return {
        ...candidate,
        aiAnalysis
      } as EnhancedCandidate;
    });

    // 按AI评分排序，高潜力优先
    enhancedCandidates.sort((a, b) => b.aiAnalysis.overallScore - a.aiAnalysis.overallScore);
    
    setCandidates(enhancedCandidates);
  }, []);

  // 筛选候选人
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || candidate.status === selectedStatus;
    const matchesPotential =
      selectedPotential === "all" || candidate.aiAnalysis.potentialRank === selectedPotential;
    const matchesHighPotentialFilter = 
      !showOnlyHighPotential || candidate.aiAnalysis.potentialRank === "high";
    
    return matchesSearch && matchesStatus && matchesPotential && matchesHighPotentialFilter;
  });

  // AI评分显示组件
  const AIScoreDisplay = ({ score, label, color = "primary" }: { score: number; label: string; color?: string }) => (
    <div className="flex items-center space-x-2">
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600">{label}</span>
          <span className="font-medium text-gray-900">{score}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full bg-${color}-500`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  // 潜力等级显示
  const getPotentialBadge = (rank: string, score: number) => {
    const rankConfig = {
      high: { 
        text: "高潜力", 
        className: "badge-success",
        icon: Star,
        glow: "ring-2 ring-green-200 shadow-green-100"
      },
      medium: { 
        text: "中等潜力", 
        className: "badge-warning",
        icon: TrendingUp,
        glow: "ring-2 ring-yellow-200 shadow-yellow-100" 
      },
      low: { 
        text: "待提升", 
        className: "badge-gray",
        icon: Target,
        glow: ""
      },
    };
    const config = rankConfig[rank as keyof typeof rankConfig] || rankConfig.low;
    const Icon = config.icon;
    
    return (
      <div className={`flex items-center space-x-1 ${config.glow}`}>
        <span className={`badge ${config.className} flex items-center space-x-1`}>
          <Icon className="h-3 w-3" />
          <span>{config.text}</span>
          <span className="text-xs opacity-80">({score})</span>
        </span>
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      applied: { text: "已申请", className: "badge-gray" },
      screening: { text: "筛选中", className: "badge-warning" },
      interviewing: { text: "面试中", className: "badge-primary" },
      completed: { text: "已完成", className: "badge-success" },
      rejected: { text: "已拒绝", className: "badge-danger" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || {
      text: status,
      className: "badge-gray",
    };
    return (
      <span className={`badge ${statusInfo.className}`}>{statusInfo.text}</span>
    );
  };

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return job?.title || "未知职位";
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">候选人管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理所有候选人信息和面试状态
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          添加候选人
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索候选人姓名或邮箱..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              className="select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">所有状态</option>
              <option value="applied">已申请</option>
              <option value="screening">筛选中</option>
              <option value="interviewing">面试中</option>
              <option value="completed">已完成</option>
              <option value="rejected">已拒绝</option>
            </select>
            <button className="btn btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              更多筛选
            </button>
          </div>
        </div>
      </div>

      {/* 候选人列表 */}
      <div className="card">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  候选人
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  申请职位
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  申请时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  面试进度
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 font-medium text-sm">
                            {candidate.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {candidate.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getJobTitle(candidate.appliedPosition)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(candidate.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(candidate.createdAt).toLocaleDateString("zh-CN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {candidate.interviewRounds.length} / 4 轮
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewCandidate(candidate)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 候选人详情模态框 */}
      {showCandidateModal && selectedCandidate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">候选人详情</h3>
              <button
                onClick={() => setShowCandidateModal(false)}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 基本信息 */}
              <div className="lg:col-span-1">
                <div className="card p-4">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-700 font-medium text-2xl">
                        {selectedCandidate.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {selectedCandidate.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {getJobTitle(selectedCandidate.appliedPosition)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedCandidate.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedCandidate.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedCandidate.resume.personalInfo.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      申请时间:{" "}
                      {new Date(selectedCandidate.createdAt).toLocaleDateString(
                        "zh-CN"
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    {getStatusBadge(selectedCandidate.status)}
                  </div>
                </div>
              </div>

              {/* 详细信息 */}
              <div className="lg:col-span-2 space-y-4">
                {/* 工作经历 */}
                <div className="card p-4">
                  <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    工作经历
                  </h5>
                  <div className="space-y-4">
                    {selectedCandidate.resume.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-gray-200 pl-4"
                      >
                        <div className="flex items-center justify-between">
                          <h6 className="font-medium text-gray-900">
                            {exp.position}
                          </h6>
                          <span className="text-sm text-gray-500">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {exp.company}
                        </p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {exp.responsibilities.slice(0, 2).map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 技能 */}
                <div className="card p-4">
                  <h5 className="font-medium text-gray-900 mb-3">技术技能</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.resume.skills.technical.map(
                      (skill, index) => (
                        <span key={index} className="badge badge-primary">
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* 面试进度 */}
                <div className="card p-4">
                  <h5 className="font-medium text-gray-900 mb-3">面试进度</h5>
                  <div className="space-y-2">
                    {["HR面试", "技术一面", "技术二面", "VP面试"].map(
                      (stage, index) => {
                        const isCompleted =
                          index < selectedCandidate.interviewRounds.length;
                        const isCurrent =
                          index === selectedCandidate.interviewRounds.length;
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <div
                              className={`w-4 h-4 rounded-full ${
                                isCompleted
                                  ? "bg-green-500"
                                  : isCurrent
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isCompleted
                                  ? "text-green-700"
                                  : isCurrent
                                  ? "text-blue-700"
                                  : "text-gray-500"
                              }`}
                            >
                              {stage}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button className="btn btn-secondary">编辑信息</button>
              <button className="btn btn-primary">
                <Calendar className="h-4 w-4 mr-2" />
                安排面试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;
