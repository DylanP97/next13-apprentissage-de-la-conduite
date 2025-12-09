"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import googleIcon from "@/public/icons/google.png";

interface ConnexionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnexionModal({ isOpen, onClose }: ConnexionModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Connecté !");
        onClose();
        router.refresh();
      } else {
        toast.error(result?.error || "Identifiants incorrects");
      }
    } else {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Inscription réussie ! Connectez-vous");
        setIsLogin(true);
        setFormData({ ...formData, firstName: "", lastName: "", password: "" });
      } else {
        const data = await res.json();
        toast.error(data.email || data.password || "Erreur d'inscription");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
          <X size={28} />
        </button>

        <div className="p-8 pt-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Connexion" : "Inscription"}
          </h2>
          <p className="text-white mb-2 italic text-sm">
            {isLogin ? "Ravi de vous revoir !" : "Rejoignez la communauté"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Prénom" required value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#91e5f6] transition"
                />
                <input type="text" placeholder="Nom" required value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#91e5f6] transition"
                />
              </div>
            )}

            <input type="email" placeholder="Email" required value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#91e5f6] transition"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#91e5f6] transition"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#91e5f6] to-[#118ba3] text-[#030213] font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </form>

          <button onClick={() => signIn("google")}
            className="w-full mt-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-3">
            <Image src={googleIcon} alt="Google" width={20} height={20} />
            Continuer avec Google
          </button>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-white/20 flex-1" />
            <span className="text-gray-500 text-sm">ou</span>
            <div className="h-px bg-white/20 flex-1" />
          </div>

          <p className="text-white">
            {isLogin ? "Pas de compte ?" : "Déjà inscrit ?"}
            <button onClick={() => setIsLogin(!isLogin)} className="text-[#91e5f6] font-medium hover:underline ml-2">
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}