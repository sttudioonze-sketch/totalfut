# TotalFut — remodelagem do site

Substitui o site atual em Wix (totalfut.com.br). Destino: Vercel.
Plataforma de cursos técnico-táticos para profissionais do futebol — treinadores,
auxiliares, preparadores e analistas de desempenho.

Última sessão: 24/09/2026.

---

## Estado atual

**Nove páginas em HTML estático, sem build.** A home e as sete landing pages de
curso estão completas e ligadas entre si. O catálogo inteiro tem preço, duração,
ementa e link de checkout Kiwify real.

| Arquivo | O que é | Artifact |
|---|---|---|
| `index.html` | **Home.** Era `prototipo-home-v3.html` | [link](https://claude.ai/artifact/GqfT1NgMYxvXehqKteJC5A) |
| `curso-analise-desempenho-avancada.html` | Bruno Baquete | [link](https://claude.ai/artifact/1mJNjGs6JZgprimVYMQq9U) |
| `curso-cruzamentos-no-futebol.html` | Thiago Mehl | [link](https://claude.ai/artifact/8x2V2hk7Gg7GnvRnnNMTzG) |
| `curso-bola-parada-ofensiva-tobar.html` | Julian Tobar | [link](https://claude.ai/artifact/LmyUCDz88ejbFUQdDoZMhJ) |
| `curso-tecnica-tatica-individual.html` | Leandro Zago — teórico | [link](https://claude.ai/artifact/HgYtdDyDCqs3hgQEDYrr4M) |
| `curso-exercicios-tecnica-tatica-individual.html` | Leandro Zago — exercícios | [link](https://claude.ai/artifact/C1WJjxyJQehgjnNG4c1to5) |
| `curso-analise-bola-parada-pombo.html` | Ricardo Pombo | [link](https://claude.ai/artifact/8zWygjNiBJvSbHmDZbQfQA) |
| `curso-bola-parada-vitoria-burse.html` | João Burse | [link](https://claude.ai/artifact/9vpou1hs61Sqj1dG1JTgHH) |
| `academy.html` | Blog, mostrando "Em breve" | sem artifact |
| `componentes.html` | Folha de componentes | [link](https://claude.ai/artifact/Jn1rXyyvR1mh8wtvrvdb6a) |

Arquivos históricos, mantidos só como registro: `prototipo-home.html` (versão A),
`prototipo-home-v2.html` (versão B), `hero-teste.html` (o teste do campo animado,
já incorporado na home).

**Cada artifact é um site isolado**, então o menu do topo de uma landing page
parece recarregar a própria página em vez de ir para a home. É limitação da
prévia — no site publicado funciona.

---

## O catálogo

| Curso | Professor | Preço | Duração | Checkout |
|---|---|---|---|---|
| Os Segredos da Análise de Desempenho Avançada | Bruno Baquete | R$447 · 12× R$46,23 | **falta** | **falta** |
| A evolução do treino de cruzamentos | Thiago Mehl | R$697 → R$397 · 12× R$39,86 | 7h31 · 3 partes | `an7Jf3X` |
| Bola parada ofensiva no futebol | Julian Tobar | R$247 → R$197 · 12× R$19,78 | 3h15 · 8 módulos | `k0k0hRh` |
| Técnica e tática individual | Leandro Zago | R$447 → R$397 · 12× R$39,86 | 6h · 4 módulos | `so6axQK` |
| Exercícios específicos | Leandro Zago | R$147 → R$97 · 12× R$9,74 | 1h23 · 11 exercícios | `h8oRO7J` |
| A análise de desempenho das bolas paradas | Ricardo Pombo | R$147 → R$97 · 12× R$9,74 | 1h55 · 7 módulos | `rZojzuy` |
| A bola parada do acesso do Vitória | João Burse | R$147 → R$97 · 12× R$9,74 | 1h27 · 5 módulos | `yVBONCi` |

Checkout completo: `https://pay.kiwify.com.br/<código>`.

### As oito palestras do Global Summit

O Bola Parada Global Summit (24, 26 e 28 de novembro de 2025) entrou no catálogo
como oito cursos, todos de bola parada. **Falta preço, duração e checkout dos
oito** — a página do evento está como "esgotado/encerrado" e não diz se as
palestras são vendidas avulsas.

| Palestra | Palestrante |
|---|---|
| Como construir um modelo de jogo e uma metodologia com bola parada | Nicolas Gagnon |
| Bolas paradas: operacionalização, do treino ao jogo | Diego Favarin |
| Arremessos laterais ofensivos: conceitos e treinamento | Julian Tobar |
| O processo do microciclo focado nas bolas paradas | Rui Pedro Sousa |
| Ações de bola parada: conceitos e princípios | Rafael Vieira |
| Bola parada defensiva e ofensiva: metodologia e treino | Bebeto Sauthier |
| Bolas paradas: do planejamento à execução no dia do jogo | Michael Mackin |
| A rotina de um analista de bolas paradas | Stuart Reid |

A do Stuart Reid é gravada e traduzida para o português.

A página do Baquete foi a primeira, montada só com o texto da home antes de eu ter
acesso às páginas do Wix — **é a única que ainda carrega pendências de conteúdo.**
Se existir uma LP dele publicada, ela fecha o catálogo.

---

## O template de curso

As sete páginas saem do mesmo molde. Para replicar, os campos que mudam estão no
comentário do topo de cada arquivo. A ordem dos blocos:

topo (foto + oferta) · para quem é · conteúdo · professor · passagens (marquee) ·
bônus · como você recebe · depoimentos · **faixa de foto** · fechamento · dúvidas

- **Barra fixa de compra** — entra quando o CTA do topo sai da tela, some sobre o
  bloco de fechamento **e sobre o rodapé**. Sem a segunda condição ela cobria a
  última linha do rodapé no celular.
- **Números dos módulos** — em `clamp(30px,3.8vw,40px)`, o mesmo corpo do preço na
  hero, lime e sem moldura. `tabular-nums` para 01 e 08 alinharem.
- **Faixa com paralaxe** antes do fechamento. `background-attachment:fixed` não
  funciona no iOS: a imagem tem 20% de folga em cima e embaixo e desliza com
  `translateY` de ±14% num `requestAnimationFrame`.
- **Bônus** — iguais em todo o catálogo: TotalFut Connect, Grupo de Alunos
  TotalFut, Coach Planner PRO, E-book do Curso.

### O enquadramento do hero

Três casos, porque só o Baquete tem foto horizontal:

- **Foto horizontal, desktop** — `translateX(17.3%) scale(1.1)` leva o assunto a
  75% da moldura. `object-position` no eixo X não resolve: acima de 1,91:1 o
  `cover` escala pela largura e o eixo X perde efeito.
- **Retrato, desktop** — a imagem é dimensionada pela altura, ancorada à direita
  na proporção original, com a borda esquerda desvanecida por máscara. Esticada
  para cobrir a moldura viraria um rosto ampliado.
- **Celular** — faixa de `clamp(340px,94vw,580px)`, imagem dimensionada pela
  altura e ancorada em `left:50%` com `translateX` do centro do assunto. Assim o
  enquadramento não depende da proporção da faixa.

---

## Sistema visual

| Token | Hex | Uso |
|---|---|---|
| `--void` | `#060705` | fundo |
| `--lime` | `#D7FF47` | acento: conversão, ícones, dados, números |
| `--azul` | `#015AFF` | **estratégico**: conta, sistema e a bola |
| `--text` / `--mute` / `--dim` | `#FFFFFF` / `#9AA08C` / `#676C5C` | texto |

**Regra do azul.** A estratégia é a valorização do futebol brasileiro: o lime
carrega verde e amarelo, o azul fecha o conjunto — e já existe no escudo do logo.
Pode em botão sólido com texto branco, na bola do campo, em `::selection` e no
foco de teclado. Não pode em texto corrido sobre escuro (3,9:1, reprova AA) nem
ao lado de um botão lime. Lime é comprar, azul é entrar na conta.

**Regra do gesto manual.** O grifo de giz nos títulos é o único elemento "à mão"
do sistema, e funciona porque é raro — uma vez por seção, numa palavra-chave. Em
24/09 avaliamos fonte grunge nos números dos módulos e decidimos manter a Sora.
Não introduzir um segundo vocabulário manual sem revisitar isso.

**Vidro** — sistema portado do projeto Portfólio Digital:
`--vidro-desfoque:blur(16px) saturate(180%)`, `--vidro:rgba(255,255,255,.08)`,
`--vidro-borda:rgba(255,255,255,.16)`, `--vidro-sombra:0 8px 28px rgba(0,0,0,.18)`.

**Tipografia** — Sora 500/600/700 nos títulos, Plus Jakarta Sans 400/500/600/700
no corpo.

**Copy** — tom sóbrio, sem superlativo. O público é avançado e o conteúdo trabalha
no detalhe. O peso vem do dado: *duas Copas do Mundo* em vez de *profissional
referência*. Nada de "descubra os segredos" ou "não perca essa oportunidade".

---

## A home

Menu · hero (campo animado em canvas) · professores · cursos · vantagens ·
TotalFut Academy · eventos · depoimentos · sobre · lista · suporte · rodapé.

- **Hero** — canvas 2D com projeção em perspectiva real, horizonte ancorado ao
  CTA medido em tempo de execução. Luzes difusas em quatro focos concentrados
  perto da headline. `prefers-reduced-motion` congela num quadro.
- **Catálogo** — abre nos quatro cards de área de especialização, com botão para
  ver todos os cursos. Filtros por tema e por professor.
- **i18n** — PT/EN/ES por dicionário JS com `data-i18n`. **Só a home tem.** As
  landing pages e a academy mostram o seletor mas ele não faz nada.
- **Treze profissionais** na seção de professores: seis conduzem curso e sete
  palestraram no Summit, marcados com o selo lime. Todos com credencial factual.
  Ramiro Rangles e André Fornaziero saíram em 24/09 — estavam como "em breve"
  desde o mapeamento.

---

## Pendências do cliente

1. **Política de reembolso** — a última objeção antes da compra, hoje sem resposta
   em nenhuma página. Aparece como nota em todas as sete.
2. **Fotos dos sete palestrantes do Summit.** Hoje os cards mostram as iniciais
   no lugar do retrato; trocar o `<div>` por um `<img>` é tudo o que falta. As
   fotos existem na página `/globalsummit` do Wix.
3. **Preço, duração e checkout das oito palestras do Summit.**
4. **Fotos horizontais em campo** para a faixa com paralaxe. Hoje seis das sete
   usam o retrato vertical, que a faixa recorta fechado no rosto. Só trocar o
   arquivo; o CSS já está pronto.
3. **Preço, ementa e checkout do curso do Baquete.**
4. **O que é o combo** — quais cursos, qual preço.
5. **Escudos dos clubes** em PNG ou SVG com fundo transparente, para as faixas de
   passagens, que hoje são texto.
6. **URLs das redes sociais** — os quatro ícones do rodapé estão em `href="#"`.
7. **WhatsApp de suporte**, horário de atendimento.
8. Confirmar, na página do Mehl, os Mundiais Sub-17 de 2011 e 2015 e a que Copa
   América de 2022 o título se refere.

---

## Técnico, antes de publicar

- **Tirar o `target="_blank"`** dos links de curso na home e dos botões de compra.
  Era workaround para revisar dentro do artifact, onde o iframe barra a troca de
  documento.
- **Tirar as notas tracejadas** (`.nota`) — são recados para o cliente, não vão ao ar.
- **i18n das landing pages e da academy.**
- **Otimizar imagens** — WebP/AVIF, `srcset`, `sizes`. Hoje são JPEG de até 1400px.
- **Favicon.**
- Lista de e-mails: recomendação é Brevo (grátis até 300/dia, PT-BR, LGPD). A
  Kiwify entrega comprador, não lead.

## Bloqueios

**Não há Node nesta máquina**, nem Homebrew. `git` e `python3` funcionam desde
13/09/2026. Next.js não roda aqui — instalar o Node LTS pelo `.pkg` do nodejs.org,
que não precisa de Xcode. Até lá, só HTML estático.

Verificação local: `python3 -m http.server 8765` na pasta do projeto.
