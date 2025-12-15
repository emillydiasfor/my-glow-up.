"use client";

import { X, Check, Crown, Sparkles } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: "free" | "premium") => void;
  currentPlan: "free" | "premium";
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe, currentPlan }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const premiumFeatures = [
    "Acesso ilimitado a todas as funcionalidades",
    "Rotinas personalizadas com IA",
    "Análise avançada de progresso",
    "Planos de treino exclusivos",
    "Receitas premium de nutrição",
    "Rotinas de skincare personalizadas",
    "Suporte prioritário",
    "Sem anúncios",
    "Novos recursos em primeira mão"
  ];

  const freeFeatures = [
    "Acesso básico às funcionalidades",
    "Até 5 rotinas por dia",
    "Missões limitadas",
    "Anúncios ocasionais"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-yellow-300" />
              <h2 className="text-2xl font-bold text-white">Escolha seu Plano</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <p className="text-purple-100 mt-2">Desbloqueie todo o potencial do Glow Up</p>
        </div>

        {/* Plans */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Plano Free</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                R$ 0
                <span className="text-lg text-gray-600 dark:text-gray-400">/mês</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Comece sua jornada gratuitamente</p>
            </div>

            <ul className="space-y-3 mb-6">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {currentPlan === "free" ? (
              <div className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-center font-medium">
                Plano Atual
              </div>
            ) : (
              <button
                onClick={() => onSubscribe("free")}
                className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Voltar para Free
              </button>
            )}
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-purple-500 rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-2xl transition-all relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              POPULAR
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                <Crown className="w-6 h-6 text-purple-600" />
                Plano Premium
              </h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                R$ 19,90
                <span className="text-lg text-gray-600 dark:text-gray-400">/mês</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Transformação completa</p>
            </div>

            <ul className="space-y-3 mb-6">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {currentPlan === "premium" ? (
              <div className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center font-medium flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" />
                Plano Atual
              </div>
            ) : (
              <button
                onClick={() => onSubscribe("premium")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Assinar Premium
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-b-3xl border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            💳 Pagamento seguro • ❌ Cancele quando quiser • 🔒 Seus dados protegidos
          </p>
        </div>
      </div>
    </div>
  );
}
