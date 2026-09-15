# TotalFut — remodelagem do site

Substitui o site atual em Wix (totalfut.com.br). Destino: Vercel.
Plataforma de cursos técnico-táticos para profissionais do futebol — treinadores,
auxiliares, preparadores e analistas de desempenho.

Última sessão: 12–13/09/2026.

---

## Estado atual

Três protótipos de home em HTML estático, mais um teste de hero isolado.
**A versão C (`prototipo-home-v3.html`) foi a escolhida** e é a base para seguir.

| Arquivo | O que é | Artifact |
|---|---|---|
| `prototipo-home.html` | Versão A — prancheta tática, dark integral, cantos retos | [link](https://claude.ai/code/artifact/523620b0-6806-44e7-8c9e-982a0560b844) |
| `prototipo-home-v2.html` | Versão B — painéis claros e escuros, estilo Supervity | [link](https://claude.ai/code/artifact/a0bc0ebb-32ae-48ae-9c78-4f9fa5cc2c9f) |
| `prototipo-home-v3.html` | **Versão C — escolhida.** Dark integral, ícones lime, cards de plano | [link](https://claude.ai/code/artifact/804479bb-b0e2-4af3-a1aa-8d8b9dd822d5) |
| `hero-teste.html` | Hero com campo animado em canvas — mais avançado que o hero da C | [link](https://claude.ai/code/artifact/b7e49aa2-550d-4bb1-9a72-d4b97829030f) |

O `hero-teste.html` está **à frente** da v3: tem o campo animado, o menu completo,
o seletor de idioma e o azul estratégico. O próximo passo é levar tudo isso para a v3.

---

## Sistema visual

### Cores

| Token | Hex | Uso |
|---|---|---|
| `--void` | `#060705` | fundo da página |
| `--card` | `#0F110C` | superfície dos cards |
| `--hair` / `--hair-2` | `#23271A` / `#2E3324` | bordas |
| `--lime` | `#D7FF47` | acento principal: conversão, ícones, dados |
| `--azul` | `#015AFF` | **estratégico**: conta, sistema e a bola |
| `--text` / `--mute` / `--dim` | `#FFFFFF` / `#9AA08C` / `#676C5C` | texto |

**Regra do azul.** A estratégia é a valorização do futebol brasileiro: o lime carrega
verde e amarelo, o azul fecha o conjunto — e já existe no escudo do logo.
Ele nunca compete com o lime.

- **Pode:** botão sólido com texto branco (5,4:1), a bola no campo, `::selection`,
  estado ativo de menu, foco de teclado.
- **Não pode:** texto corrido sobre fundo escuro (3,9:1, reprova AA), nem botão
  ao lado de um botão lime, nem as linhas do campo.
- Proporção atual: ~5% da superfície.

Lime é comprar. Azul é entrar na conta.

### Tipografia

- **Sora** 500/600/700 — títulos
- **Plus Jakarta Sans** 400/500/600/700 — corpo
- Sem fonte mono na versão C (era da versão A)

### Logos

`assets/logo-horizontal-branco.svg` e `logo-vertical-branco.svg` para fundo escuro.
As versões escuras (`-escuro.svg`) são para fundo claro. Originais em
`LOGOS  HORIZONTAIS/` e `LOGOS VERTICAIS/` — o `2.svg` horizontal e o `1.svg`
vertical são os brancos.

---

## O hero animado

Canvas 2D, sem biblioteca. `hero-teste.html`.

- **Projeção em perspectiva real** — câmera atrás e acima do gol, `proj(px, pz)`
  divide pela profundidade. Nada é hard-coded em pixels.
- **Horizonte ancorado nos botões** — medido em tempo de execução a partir de
  `.hero__cta`, com folga de 30px (20px no celular), limitado entre 34% e 74% da altura.
  Não usa fração fixa: acompanha o refluxo do título em qualquer tela.
- **Respiro embaixo** — a linha de fundo para antes da borda do hero (7% da altura,
  entre 22 e 60px), para o campo não entrar atrás da seção seguinte.
- **Bloco de 11 nós** — desliza conforme o lado da bola, sobe e recua, comprime as
  linhas. Cada jogador tem fase própria. Linhas à frente acompanham mais o lado da bola.
- **Ligações calculadas** — dentro da linha e para os 2 mais próximos da linha seguinte.
  Não são escritas à mão: trocar de formação refaz tudo sozinho.
- **A bola** — azul, percorre as ligações como um passe, com aceleração, altura no ar
  e pausa. O trecho em uso acende em azul.
- **Formações** 1-4-3-3, 1-4-4-2, 1-3-5-2, 1-4-2-3-1 com interpolação entre elas.
  A barra de teste embaixo **sai na versão final**.
- `ResizeObserver` + `document.fonts.ready` + `orientationchange` — o canvas remede
  quando a Sora carrega e o título reflui.
- `prefers-reduced-motion` congela num frame estático.

---

## Copy

Tom sóbrio, sem superlativo. O público é avançado e o conteúdo trabalha no detalhe.
Nada de "descubra os segredos", "altíssimo nível", "não perca essa oportunidade".
O peso vem do dado: *duas Copas do Mundo* em vez de *profissional referência*.

**Hero em uso:**

> **TOTALFUT**
> Cursos e eventos avançados para profissionais do futebol.
> Aprenda com profissionais de elite — analistas e treinadores em atividade na
> Seleção Brasileira, na Série A e em seleções e clubes da Europa e das Américas.

Alternativas para a terceira linha:
- "Aprenda com quem trabalha na elite. Os formadores estão em atividade em clubes e seleções, no Brasil e fora."
- "Aprenda com profissionais de elite, em atividade. Nenhum curso é terceirizado."

---

## Menu

Logo · TotalFut · Formadores · Cursos · Eventos · [seletor de idioma] · [Área do aluno]

- **Área do aluno** leva ao login da Kiwify. Azul sólido.
- **Idioma** PT / EN / ES. Hoje só troca o estado da interface e o atributo `lang`;
  o roteamento (`/en/`, `/es/`) entra na migração.
- Breakpoint em **980px** — abaixo disso vai tudo para o painel.
- O CTA "Ver cursos" saiu do menu de propósito: dois botões coloridos lado a lado
  anulam um ao outro. Se voltar com cabeçalho fixo, só depois que o hero sair da tela.

**Pendência:** "TotalFut" no menu é a página institucional ou o link de home?
Está como institucional. Se for home, o logo já faz isso e o item vira "Sobre".

---

## Conteúdo mapeado do site atual

### Seis cursos

| Curso | Formador | Preço | Slug antigo |
|---|---|---|---|
| Os Segredos da Análise de Desempenho Avançada | Bruno Baquete | **falta** | `/blank` |
| A Análise de Desempenho da Bola Parada Ofensiva | Ricardo Pombo | R$147 → **R$97**, 12× R$9,74, 1h55, 7 blocos | `/analisedasbolasparadas` |
| Cruzamentos no Futebol | Thiago Mehl | **falta** | `/cruzamentosnofutebol` |
| Técnica e Tática Individual | Leandro Zago | **falta** | `/leandrozagocaetaticaindividual` |
| Bola Parada Ofensiva | Julian Tobar | **falta** | `/bolaparadaofensiva` |
| A Bola Parada no acesso do E.C. Vitória à Série B | João Burse | **falta** | `/joaoburse` |

Capas em `assets/cursos/`, baixadas do Wix em resolução original.

### Nove formadores

Fotos em `assets/professores/`. Credenciais confirmadas:

- **Bruno Baquete** — analista, Seleção Brasileira, duas Copas do Mundo. Passagens por Vitória, Corinthians e Athletico-PR.
- **Ricardo Pombo** — analista, instrutor CBF Academy (Licença Pro e A). Cinco Copas do Mundo e duas Olimpíadas com a Seleção Feminina.
- **João Burse** — treinador. Acesso do E.C. Vitória à Série B.

**Faltam credenciais:** Leandro Zago, Thiago Mehl, Julian Tobar.
**Em breve:** Ramiro Rangles (Head of Kinetic Analytics), André Fornaziero (fisiologista).
Caio Fonseca saiu da home — quatro "em breve" comunicavam lacuna.

### Outros dados

- 600+ alunos formados
- Entrega: Kiwify, 12 meses de acesso, vídeo HD, app no celular, certificado digital
- Grupo de WhatsApp de alunos + **TotalFut Connect** (vagas em clubes e comissões)
- Cursos divididos em blocos de 1 a 20 minutos, para consulta no meio da temporada
- Seis depoimentos, editados para a frase que carrega o resultado concreto

---

## Bloqueios

**Não há Node nesta máquina.** Nem Homebrew, nem Xcode CLI, nem python3.
Next.js não roda aqui. Instalar o Node LTS pelo `.pkg` do nodejs.org — não precisa
de Xcode. Até lá, só HTML estático.

---

## Pendências do cliente

1. Preço e link de checkout Kiwify dos 5 cursos que faltam
2. Credencial factual de Zago, Mehl e Tobar — clube atual e um resultado
3. O que é o "combo" — quais cursos, qual preço
4. i18n: PT primeiro com a arquitetura pronta, ou os 3 idiomas no v1?
5. Node instalado

---

## Próximos passos

1. Levar o hero animado, o menu e o azul para a `prototipo-home-v3.html`
2. Tirar a barra de teste de formações
3. Grade de breakpoints do site inteiro (≥1600 / 1024–1599 / 768–1023 / <768) —
   adiada de propósito até o conteúdo estabilizar
4. Otimizar imagens: WebP/AVIF, `srcset`, `sizes` (hoje são JPEG de até 1400px)
5. Template único de landing page de curso, alimentado por um arquivo de dados
6. Lista de e-mails — recomendação: Brevo (grátis até 300/dia, PT-BR, LGPD, API simples).
   Alternativa com mais controle: Resend + Supabase. A Kiwify só entrega comprador, não lead.
7. Blog
8. Migrar para Next.js quando o Node estiver instalado
