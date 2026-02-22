import { useMutation } from "@tanstack/react-query";
import { api, type LeadInput, type LeadResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: LeadInput) => {
      // Validate data with Zod schema before sending
      const validated = api.leads.create.input.parse(data);
      
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const errorData = await res.json();
        // Try to parse structured error
        try {
          const error = api.leads.create.responses[400].parse(errorData);
          throw new Error(error.message);
        } catch {
          throw new Error('Ocorreu um erro ao enviar sua mensagem.');
        }
      }

      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Sua mensagem foi enviada. Entraremos em contato em breve.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });
}
