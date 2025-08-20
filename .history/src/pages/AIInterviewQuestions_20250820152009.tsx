import {
  Brain,
  Plus,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Zap,
  BookOpen,
  MessageSquare,
  Download,
  Upload,
  RefreshCw,
  Lightbulb,
  Target,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import questionTemplatesData from "../data/questionTemplates.json";

interface Question {
  id: string;
  category: string;
  type: "technical" | "behavioral" | "cultural" | "situational";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  expectedAnswer?: string;
  evaluationCriteria: string[];
  tags: string[];
  aiGenerated: boolean;
  usageCount: number;
  averageScore: number;
  effectiveness: number;
}

interface AIQuestionSuggestion {
  id: string;
  position: string;
  suggestedQuestions: Question[];
  confidence: number;
  reasoning: string;
}

const AIInterviewQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [aiSuggestions, setAiSuggestions] = useState<AIQuestionSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(true);

  useEffect(() => {
    // 加载问题模板数据并扩展
    const processedQuestions: Question[] = (questionTemplatesData as any[]).map((template, index) => ({
      id: `q-${index}`,
      category: template.category || "技术面试",
      type: template.type || "technical",
      difficulty: template.difficulty || "medium",
      question: template.question,
      expectedAnswer: template.expectedAnswer,
      evaluationCriteria: template.evaluationCriteria || ["技术准确性", "思维逻辑", "沟通表达"],
      tags: template.tags || ["React", "JavaScript"],
      aiGenerated: Math.random() > 0.6, // 模拟AI生成标记
      usageCount: Math.floor(Math.random() * 50),
      averageScore: Math.round((Math.random() * 3 + 7) * 10) / 10, // 7-10分
      effectiveness: Math.round(Math.random() * 30 + 70), // 70-100%
    }));

    setQuestions(processedQuestions);
    setFilteredQuestions(processedQuestions);

    // 生成AI建议
    generateAISuggestions();
  }, []);

  useEffect(() => {
    // 过滤问题
    let filtered = questions.filter((question) => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || question.category === selectedCategory;
      const matchesType = selectedType === "all" || question.type === selectedType;
      const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesType && matchesDifficulty;
    });

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, selectedCategory, selectedType, selectedDifficulty]);

  const generateAISuggestions = () => {
    const suggestions: AIQuestionSuggestion[] = [
      {
        id: "suggestion-1",
        position: "前端开发工程师",
        suggestedQuestions: questions.slice(0, 3),
        confidence: 92,
        reasoning: "基于该职位要求和历史面试数据，推荐这些高效问题",
      },
      {
        id: "suggestion-2", 
        position: "高级Java开发工程师",
        suggestedQuestions: questions.slice(3, 6),
        confidence: 88,
        reasoning: "结合职位技能要求和候选人背景分析",
      },
    ];
    setAiSuggestions(suggestions);
  };

  const generateAIQuestions = async () => {
    setIsGenerating(true);
    // 模拟AI生成问题的过程
    setTimeout(() => {
      const newQuestions: Question[] = [
        {
          id: `ai-${Date.now()}`,
          category: "AI生成",
          type: "technical",
          difficulty: "medium",
          question: "请描述React中useState和useEffect的执行时机，以及它们之间的关系？",
          evaluationCriteria: ["概念理解", "实际应用", "最佳实践"],
          tags: ["React", "Hooks", "状态管理"],
          aiGenerated: true,
          usageCount: 0,
          averageScore: 0,
          effectiveness: 85,
        },
      ];

      setQuestions(prev => [...newQuestions, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const categories = ["all", ...Array.from(new Set(questions.map(q => q.category)))];
  const types = ["all", "technical", "behavioral", "cultural", "situational"];
  const difficulties = ["all", "easy", "medium", "hard"];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "technical": return "bg-blue-100 text-blue-800";
      case "behavioral": return "bg-green-100 text-green-800";
      case "cultural": return "bg-purple-100 text-purple-800";
      case "situational": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600";
      case "medium": return "text-yellow-600";
      case "hard": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 text-primary-500 mr-3" />
            AI智能问题库
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            智能生成面试问题，提供个性化问题推荐和效果分析
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-secondary">
            <Upload className="h-4 w-4 mr-2" />
            导入问题
          </button>
          <button className="btn btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            导出题库
          </button>
          <button 
            className="btn btn-primary"
            onClick={generateAIQuestions}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            {isGenerating ? "AI生成中..." : "AI智能生成"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 主内容区域 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 搜索和过滤 */}
          <div className="card p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="搜索问题内容或标签..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* 过滤器 */}
              <div className="flex gap-3">
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "全部分类" : category}
                    </option>
                  ))}
                </select>

                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === "all" ? "全部类型" : type}
                    </option>
                  ))}
                </select>

                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "全部难度" : difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                  <div className="text-sm text-gray-600">总问题数</div>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {questions.filter(q => q.aiGenerated).length}
                  </div>
                  <div className="text-sm text-gray-600">AI生成</div>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(questions.reduce((acc, q) => acc + q.averageScore, 0) / questions.length * 10) / 10}
                  </div>
                  <div className="text-sm text-gray-600">平均评分</div>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(questions.reduce((acc, q) => acc + q.effectiveness, 0) / questions.length)}%
                  </div>
                  <div className="text-sm text-gray-600">平均有效性</div>
                </div>
              </div>
            </div>
          </div>

          {/* 问题列表 */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                问题列表 ({filteredQuestions.length} 个)
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* 问题标题和标记 */}
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">
                            {question.question}
                          </h4>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(question.type)}`}>
                              {question.type}
                            </span>
                            <span className={`text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                            <span className="text-sm text-gray-500">
                              {question.category}
                            </span>
                            {question.aiGenerated && (
                              <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-xs font-medium flex items-center">
                                <Zap className="h-3 w-3 mr-1" />
                                AI生成
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 评估标准 */}
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-1">评估标准:</h5>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {question.evaluationCriteria.map((criteria, index) => (
                            <li key={index}>{criteria}</li>
                          ))}
                        </ul>
                      </div>

                      {/* 使用统计 */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          使用 {question.usageCount} 次
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          评分 {question.averageScore}/10
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                          有效性 {question.effectiveness}%
                        </div>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Star className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI智能推荐面板 */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                AI智能推荐
              </h3>
              <button
                onClick={() => setShowAIPanel(!showAIPanel)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showAIPanel ? "收起" : "展开"}
              </button>
            </div>
            
            {showAIPanel && (
              <div className="space-y-4">
                {aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{suggestion.position}</h4>
                      <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
                        置信度 {suggestion.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{suggestion.reasoning}</p>
                    <div className="space-y-2">
                      {suggestion.suggestedQuestions.slice(0, 2).map((q) => (
                        <div key={q.id} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          {q.question.length > 50 ? `${q.question.substring(0, 50)}...` : q.question}
                        </div>
                      ))}
                    </div>
                    <button className="text-sm text-primary-600 hover:text-primary-700 mt-2 font-medium">
                      查看全部推荐 →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 快速操作 */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
            <div className="space-y-3">
              <button className="w-full btn btn-primary justify-start">
                <Plus className="h-4 w-4 mr-3" />
                新建问题
              </button>
              <button className="w-full btn btn-secondary justify-start">
                <Brain className="h-4 w-4 mr-3" />
                批量AI生成
              </button>
              <button className="w-full btn btn-secondary justify-start">
                <Target className="h-4 w-4 mr-3" />
                效果分析
              </button>
              <button className="w-full btn btn-secondary justify-start">
                <BookOpen className="h-4 w-4 mr-3" />
                模板管理
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewQuestions;
