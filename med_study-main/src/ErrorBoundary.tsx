import React, { Component } from 'react';

// Se uma tela quebrar, mostra o erro e um botão para recarregar, em vez de deixar o app em branco.
interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  // O projeto não tem @types/react: declara os membros herdados usados aqui.
  declare props: Props;
  declare setState: (state: State) => void;
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Erro na tela:', error);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-bg">
        <div className="max-w-lg w-full card p-6 space-y-4">
          <h1 className="text-xl font-black text-brand-navy">Esta tela não abriu</h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            Algo deu errado ao abrir este conteúdo. Recarregar a página costuma resolver, principalmente logo depois de uma atualização do site.
          </p>
          <pre className="text-[11px] text-rose-300 bg-bg/60 border border-line rounded-lg p-3 whitespace-pre-wrap break-words">{error.message}</pre>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold cursor-pointer">
              Recarregar página
            </button>
            <button onClick={() => this.setState({ error: null })} className="px-4 py-2 rounded-xl bg-card border border-line text-brand-navy text-sm font-bold cursor-pointer">
              Tentar de novo
            </button>
          </div>
        </div>
      </div>
    );
  }
}
