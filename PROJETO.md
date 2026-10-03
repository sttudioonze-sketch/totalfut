# TotalFut — remodelagem do site

Substitui o site atual em Wix (totalfut.com.br). Destino: Vercel.
Plataforma de cursos técnico-táticos para profissionais do futebol — treinadores,
auxiliares, preparadores e analistas de desempenho.

Última sessão: 03/10/2026.

---

## Estado atual

**Dez páginas em HTML estático, sem build.** A home e as oito landing pages de
curso estão completas e ligadas entre si. As oito LPs têm preço, duração, ementa
e checkout Kiwify real.

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
| `curso-organizacao-defensiva.html` | Leandro Zago — fase defensiva | [link](https://claude.ai/artifact/LysraNggcVyjh1UiDFPdQx) |
| `ferramentas/og-card.html` | Gerador dos cards de compartilhamento | sem artifact |
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

As fotos de hero chegam **2000×1333, 3:2, com o desvanecer para o preto já
embutido na arte**, à esquerda. Isso define o tratamento: a foto ocupa a hero
inteira, sem máscara de CSS, e o `::after` é só uma camada leve que garante a
leitura do texto. O degradê principal é o da própria arte.

A tentativa anterior — caixa de 52% com máscara em CSS — somava dois degradês,
escurecia o assunto e o empurrava para um canto.

**Briefing para novas fotos.** A caixa muda de proporção conforme a tela, de 0,76
a 1,58, então o que importa mais que o tamanho são três regras:

1. Assunto um pouco à direita do centro — os 46% da esquerda somem no degradê.
2. Respiro de 15% da altura acima da cabeça; o recorte mais fechado come pelo topo.
3. Zona segura na faixa central de 60% da largura, o único trecho que aparece em
   todos os dispositivos.

Meio corpo ou três quartos, em campo, com profundidade atrás.

**Celular** — faixa de `clamp(340px,94vw,580px)` acima do texto, mesma foto.

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

Menu · hero · novidades · trilha de conteúdos · professores · vantagens ·
TotalFut Academy · depoimentos · sobre · lista · suporte · rodapé.

- **Hero** — canvas 2D com projeção em perspectiva real, horizonte ancorado ao
  CTA medido em tempo de execução. `prefers-reduced-motion` congela num quadro.
- **Novidades** — o lançamento e o próximo evento ao vivo numa seção só,
  separados por um rótulo entre fios em vez de outro `<h2>`. O cartão de
  lançamento tem selo "Novo" com ponto pulsante e os dados num painel de vidro
  único, não em cinco caixas.
- **Trilha de conteúdos** — os dezesseis cursos numa pista horizontal com
  scroll-snap, quatro por vez no desktop e um no celular. Os cartões são
  ordenados por professor, para que ninguém apareça duas vezes separado. Três
  modos de escolha: por área, por professor, todos.
- **Parede de professores** — treze rostos em tiles quadrados, sete por fileira.
  Era uma grade de cartões de 2.363px, um quinto da home; hoje são 860px. O tile
  inteiro é o link e filtra a trilha por aquele professor.
- **Assinatura do estúdio** — cartão de vidro dentro do rodapé, em todas as dez
  páginas. Sem lime e sem grifo de giz, que são vocabulário da TotalFut.
- **i18n** — PT/EN/ES por dicionário JS com `data-i18n`. **Só a home tem.** As
  landing pages e a academy mostram o seletor mas ele não faz nada.

### O carrossel

Uma função só, `montarCarrossel(pista, pontos, setas, seletorItem)`, serve aos
depoimentos e à trilha. O número de páginas vem da largura real da pista, não de
uma contagem fixa, então segue valendo quando o filtro muda a quantidade de
cartões e quando o layout passa de um para quatro por vez.

Duas armadilhas que custaram caro e estão resolvidas:

- **Medir a pista escondida.** O handler dos modos chamava `aplicarFiltros()`
  antes de tornar a pista visível; largura zero, e cada curso virava uma página.
  A vista entra primeiro, o filtro depois.
- **Rolagem programática no painel de prévia.** O painel bloqueia `scrollTo` em
  contêineres aninhados, então `element.click()` por script dá falso negativo.
  Testar seta de carrossel exige clique real do mouse — não é bug do site.

---

## Os cursos sem página de venda

Cinco cursos do Summit já têm checkout mas ainda não têm LP. O botão deles abre
um aviso explicando que a página está em produção, que o curso existe e está
completo, e oferecendo os dois caminhos: ir ao checkout ou falar com o suporte.
Mandar direto ao pagamento sem explicação quebraria a confiança; esconder o curso
perderia a venda.

Três ainda não têm nem checkout: Nicolas Gagnon, Diego Favarin e Bebeto Sauthier.

---

## Pendências do cliente

1. **Preços das oito palestras do Global Summit.** Cinco já têm checkout, mas os
   cartões mostram "valor a definir" — botão de compra sem preço fica estranho.
2. **Checkout de três cursos**: Nicolas Gagnon, Diego Favarin e Bebeto Sauthier.
3. **Quem é** o homem de polo do Coritiba e os das fotos "duas bolas" e "Santos",
   das últimas remessas. Ficaram fora do acervo para não arriscar nome errado.
4. **Fotos dos palestrantes do Summit** que ainda faltam.
5. **Licença da foto do Michael Mackin**, que tem marca d'água da Sportsfile.
6. **Contato do estúdio na assinatura** — hoje usa `sttudio11.com.br` e o mesmo
   WhatsApp do suporte da TotalFut. Confirmar se o estúdio tem número próprio.
7. **URL da Área do aluno** (login Kiwify) — os botões estão em `href="#"`.
8. **O que é o combo** — quais cursos, qual preço.
9. **Escudos dos clubes** em PNG ou SVG com fundo transparente, para as faixas de
   passagens, que hoje são texto.
10. Confirmar, na página do Mehl, os Mundiais Sub-17 de 2011 e 2015 e a que Copa
    América de 2022 o título se refere.
11. **Depoimentos por curso.** Os seis que existem são genéricos e saíram das
    páginas de venda; hoje ficam só na home, em carrossel.

---

## Técnico, antes de publicar

- **Tirar o `target="_blank"`** dos links de curso na home e dos botões de compra.
  Era workaround para revisar dentro do artifact, onde o iframe barra a troca de
  documento.
- **Tirar as notas tracejadas** (`.nota`) — são recados para o cliente, não vão ao
  ar. Saíram das oito LPs; a home ainda tem algumas.
- **i18n das landing pages e da academy.**
- **Auto-hospedar as fontes.** Sora e Plus Jakarta Sans vêm do Google Fonts, que
  bloqueia a renderização e causa salto de layout. Com os `.ttf` no projeto
  também dá para gerar os cards sociais em 1200×630 por PIL — hoje saem em
  800×420, que é o teto da captura do painel.
- **Otimizar imagens** — 6,3 MB em `assets/`, sem WebP/AVIF nem `srcset`. Os
  "SVG" do logo são PNG em base64 dentro de um SVG, 264 KB cada, e serrilham em
  tela grande: refazer em vetor de verdade.
- Lista de e-mails: recomendação é Brevo (grátis até 300/dia, PT-BR, LGPD). A
  Kiwify entrega comprador, não lead.

### Espaço negativo, medido e ainda por fazer

Três pontos levantados em 03/10 e não resolvidos:

- **Quatro medidas de corpo em 2px de diferença** (13,5 / 14 / 14,5 / 15,5). Não
  é escala, é ruído — e 13,5px é tamanho de painel, não de leitura.
- **Gap de 12px entre cartões contra 20–26px de padding interno.** Está
  invertido: o respiro devia estar entre os objetos, não dentro deles.
- **Ritmo uniforme de 72px** entre todas as seções. Intervalo idêntico do começo
  ao fim é o que faz uma página parecer template.

---

## Bloqueios

**Não há Node nesta máquina**, nem Homebrew. `git` e `python3` funcionam desde
13/09/2026. Next.js não roda aqui — instalar o Node LTS pelo `.pkg` do nodejs.org,
que não precisa de Xcode. Até lá, só HTML estático.

Verificação local: `python3 -m http.server 8765` na pasta do projeto.
