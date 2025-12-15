"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Plus, Check, Trash2, Edit2, Save, X } from "lucide-react";

interface Task {
  id: string;
  time: string;
  title: string;
  description: string;
  completed: boolean;
  category: "morning" | "afternoon" | "evening" | "night";
}

interface RoutineViewProps {
  addPoints: (points: number) => void;
}

export function RoutineView({ addPoints }: RoutineViewProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    time: "",
    title: "",
    description: "",
    category: "morning" as Task["category"],
  });

  useEffect(() => {
    // Carregar tarefas do localStorage
    const savedTasks = localStorage.getItem("glowup_routine_tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Tarefas exemplo
      const defaultTasks: Task[] = [
        {
          id: "1",
          time: "07:00",
          title: "Rotina Matinal",
          description: "Acordar, beber água e alongar",
          completed: false,
          category: "morning",
        },
        {
          id: "2",
          time: "08:00",
          title: "Café da Manhã",
          description: "Refeição saudável e balanceada",
          completed: false,
          category: "morning",
        },
        {
          id: "3",
          time: "12:00",
          title: "Almoço",
          description: "Refeição principal do dia",
          completed: false,
          category: "afternoon",
        },
        {
          id: "4",
          time: "18:00",
          title: "Treino",
          description: "Exercícios físicos",
          completed: false,
          category: "evening",
        },
        {
          id: "5",
          time: "22:00",
          title: "Skincare Noturno",
          description: "Cuidados com a pele antes de dormir",
          completed: false,
          category: "night",
        },
      ];
      setTasks(defaultTasks);
      localStorage.setItem("glowup_routine_tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("glowup_routine_tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        if (newCompleted) {
          addPoints(5); // Ganhar 5 pontos ao completar tarefa
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    saveTasks(updatedTasks);
  };

  const addTask = () => {
    if (!newTask.time || !newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      time: newTask.time,
      title: newTask.title,
      description: newTask.description,
      completed: false,
      category: newTask.category,
    };

    saveTasks([...tasks, task]);
    setNewTask({ time: "", title: "", description: "", category: "morning" });
    setShowAddTask(false);
  };

  const deleteTask = (taskId: string) => {
    saveTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task.id);
    setNewTask({
      time: task.time,
      title: task.title,
      description: task.description,
      category: task.category,
    });
  };

  const saveEditTask = () => {
    if (!editingTask) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === editingTask) {
        return {
          ...task,
          time: newTask.time,
          title: newTask.title,
          description: newTask.description,
          category: newTask.category,
        };
      }
      return task;
    });

    saveTasks(updatedTasks);
    setEditingTask(null);
    setNewTask({ time: "", title: "", description: "", category: "morning" });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setNewTask({ time: "", title: "", description: "", category: "morning" });
  };

  const getCategoryColor = (category: Task["category"]) => {
    switch (category) {
      case "morning":
        return "from-yellow-400 to-orange-500";
      case "afternoon":
        return "from-blue-400 to-cyan-500";
      case "evening":
        return "from-purple-400 to-pink-500";
      case "night":
        return "from-indigo-500 to-purple-600";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getCategoryLabel = (category: Task["category"]) => {
    switch (category) {
      case "morning":
        return "Manhã";
      case "afternoon":
        return "Tarde";
      case "evening":
        return "Noite";
      case "night":
        return "Madrugada";
      default:
        return "";
    }
  };

  const groupedTasks = {
    morning: tasks.filter((t) => t.category === "morning").sort((a, b) => a.time.localeCompare(b.time)),
    afternoon: tasks.filter((t) => t.category === "afternoon").sort((a, b) => a.time.localeCompare(b.time)),
    evening: tasks.filter((t) => t.category === "evening").sort((a, b) => a.time.localeCompare(b.time)),
    night: tasks.filter((t) => t.category === "night").sort((a, b) => a.time.localeCompare(b.time)),
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header com Progresso */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rotina Diária</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {completedCount} de {totalCount} tarefas concluídas
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddTask(!showAddTask)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
          {progressPercentage.toFixed(0)}% do dia completo
        </p>
      </div>

      {/* Formulário Adicionar/Editar Tarefa */}
      {(showAddTask || editingTask) && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Período
                </label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task["category"] })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="morning">Manhã</option>
                  <option value="afternoon">Tarde</option>
                  <option value="evening">Noite</option>
                  <option value="night">Madrugada</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Ex: Café da manhã"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Detalhes da tarefa..."
                rows={3}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              {editingTask ? (
                <>
                  <button
                    onClick={saveEditTask}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={addTask}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 rounded-xl hover:shadow-lg transition-all"
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl hover:shadow-lg transition-all"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lista de Tarefas por Período */}
      {(["morning", "afternoon", "evening", "night"] as Task["category"][]).map((category) => {
        const categoryTasks = groupedTasks[category];
        if (categoryTasks.length === 0) return null;

        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {getCategoryLabel(category)}
              </h3>
              <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`} />
            </div>

            {categoryTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md transition-all ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500"
                        : "border-gray-300 dark:border-gray-600 hover:border-purple-500"
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {task.time}
                      </span>
                    </div>
                    <h4
                      className={`font-bold text-gray-900 dark:text-white mb-1 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditTask(task)}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {tasks.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Nenhuma tarefa ainda
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Comece a organizar sua rotina diária adicionando tarefas
          </p>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Adicionar Primeira Tarefa
          </button>
        </div>
      )}
    </div>
  );
}
