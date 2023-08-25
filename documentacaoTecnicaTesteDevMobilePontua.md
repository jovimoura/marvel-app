# *Teste Desenvolvimento Pontua Web*
> Esse é o teste para desenvolvedores na Pontua Web.<br>
> Sinta-se livre para editar a partir do título "Documentação da Aplicação".<br>
> Essa aplicação deve ser criada com base e utilização na api fornecida pela Marvel 
[https://developer.marvel.com/](https://developer.marvel.com/)<br>
---

> Qualquer dúvida poderá ser enviada por e-mail em tecnologia@pontua.com.br;<br>
> O prazo para finalização do teste será fornecido pelo setor de Recursos Humanos.<br>
>***Não deixe de entregar sua aplicação***, mesmo que não esteja completa ou perfeita;<br>
> A entrega do código deve ser feita no GitHub e, após a conclusão, notifique a equipe através dos e-mails  tecnologia@pontua.com.br e gente@pontua.com.br.<br>

---

>Link para layout no Figma: [layout]('https://www.figma.com/file/WgcfxyLOze9TZDUzFJ26Dx/Teste-de-Desenvolvimento-Pontua-Mobile?type=design&node-id=218%3A4648&mode=design&t=UOMzcvXkefwe0ffA-1')

---

## Orientações

***Tecnologia e Packages***
>- A aplicação deve ser desenvolvida em React Native.
>- Não há restrições na utilização de pacotes (packages). Você pode utilizar aqueles que melhor se adequam às necessidades da aplicação.

***Autenticação***
>- As chamadas de login devem ser mockadas, ou seja, você pode simular o processo de autenticação sem se conectar a um servidor real.
>- Utilize JWT (JSON Web Token) para gerenciar os tokens de acesso.

***Recuperação de Senha***
>- O processo de recuperação de senha também deve ser mockado na aplicação, ou seja, você pode simular o envio de e-mails de recuperação e o processo de redefinição de senha.

***Cadastro***
>- Para o cadastro, você pode utilizar um banco de dados offline ou o Firebase para armazenar os dados dos usuários.

***Colaboração e Ideias***
>- Qualquer alteração, adição de funcionalidades ou ideias são bem-vindas.
>- Certifique-se de notificar antecipadamente qualquer alteração significativa que você planeje fazer.

## Página de Login

***Eu como usuário:***<br>
> Quero ser capaz de realizar o login no aplicativo através do meu usuário e senha.<br>

***Quando eu:***<br>
> Clicar no ícone de olho localizado na lateral direita do campo de senha, a senha digitada deve ser exibida. Ao clicar novamente, a senha deve ser ocultada;<br>
> Clicar no botão "Entrar", se o login for bem-sucedido, devo ser redirecionado para a próxima tela. Caso ocorra um erro, devo visualizar uma notificação informando que o e-mail ou senha estão inválidos;<br>
> Clicar em "forgot password", devo ser redirecionado para a página correspondente;<br>
> Escolher uma das opções de login social, devo ser capaz de acessar o aplicativo com minhas credenciais de login social;<br>

### *Opcional*
> Acessar o aplicativo utilizando o login social.<br>

### *Critérios de aceite*
>- Validação de e-mail e senha deve ser implementada;<br>
>- Mensagem de erro deve ser exibida quando necessário;<br>
>- Após o login válido, o redirecionamento para a página "Home" deve ocorrer;<br>
>- Ao clicar em "forgot password", devo ser direcionado para a página correspondente;<br>
>- O design deve ser o mais fiel possível ao layout presente no Figma;<br>

---

## Página de Redefinição de Senha

### Esta é uma página que deve ser criada com base na sua criatividade. As informações abaixo devem servir como guia para o desenvolvimento. 

***Requisitos:***<br>
> Ao acessar a página, devo visualizar um campo para inserir o e-mail e um botão para solicitar a redefinição de senha;<br>
> Deve haver validação caso o e-mail não esteja cadastrado;<br>
> Ao clicar no botão, devo ser redirecionado para a próxima etapa;<br>
> Na próxima etapa, devo visualizar 6 campos para inserir o código enviado (simulado);<br>
> Deve ser exibido um temporizador na tela, com uma contagem regressiva de 45 segundos para solicitar um novo código;<br>
> Na documentação, deve ser fornecido um código correto para fins de teste;<br>
> Se o código inserido estiver incorreto, devo visualizar uma mensagem de aviso indicando que o código está incorreto;<br>
> Se o código inserido estiver correto, devo ser redirecionado para a próxima etapa;<br>
> Na próxima etapa, devem aparecer dois campos para inserir a nova senha, um para inserção e outro para confirmação;<br>
> Deve haver validação dos campos para garantir que as senhas digitadas sejam idênticas;<br>
> Ao clicar no botão, devo ser redirecionado de volta para a tela de login;<br>

### *Critérios de aceite*
>- Todos os requisitos acima devem ser cumpridos;<br>
>- Deve ser utilizado um banco de dados offline ou Firebase para o armazenamento dos dados de cadastro;<br>

---

## Página de Cadastro de usuário

### Esta é uma página que deve ser criada de acordo com a sua criatividade. As informações abaixo devem servir como guia para o desenvolvimento. 

***Requisitos:***<br>    
> Ao acessar a tela, devo ver os seguintes elementos:<br> 
>- um campo para inserir o nome completo;<br>
>- um campo para inserir o email;<br>
>- um campo para inserir a senha;<br>
>- Um campo para inserir novamente a senha e confirmar se elas coincidem;<br>
>- um botao para cadastrar;<br>
>- Validação do campo de e-mail para verificar se é um e-mail válido;<br>
>- Validação do campo de nome com as seguintes regras: O primeiro nome não pode ter menos de 3 letras A partir do segundo nome, não pode haver abreviações (deve ter pelo menos 2 letras);<br>
>- Após o cadastro, devo ser redirecionado para a tela de login;

### *Critérios de aceite*
>- Todos os requisitos acima devem ser cumpridos;<br>
>- Deve ser utilizado um banco de dados offline ou Firebase para o armazenamento dos dados de cadastro;<br>      

---

## Página Inicial (Home)

***Eu como usuário:***<br>
> Desejo visualizar quatro seções em forma de carrossel, sendo elas Heróis, Quadrinhos, Séries e Eventos;<br> 
> Desejo visualizar uma lista de cards contendo a imagem e o título de cada item;<br>

***Quando eu:***<br>
> Clicar no ícone de pesquisa, deve aparecer um campo para digitar minha busca e os cartões devem se ajustar de acordo com a busca, exibindo resultados relacionados a heróis, quadrinhos, séries ou eventos;<br>
> Clicar em uma das opções de filtro, os cards devem ser filtrados para exibir apenas a categoria selecionada;<br>
> Clicar em um dos cards, devo ser redirecionado para a página de informações detalhadas do item;<br>

### *Critérios de aceite*
>- Todos os requisitos acima devem ser atendidos;<br>
>- Cada seção deve ter no mínimo 22 cards listados;<br>
>- Ao clicar em um card, devo ser redirecionado para uma página com informações detalhadas sobre o item;<br>
>- O design da página deve ser o mais fiel possível ao layout presente no Figma;<br>

---

## Página de Perfil

***Eu como usuário:***<br>
> Desejo visualizar as informações do herói, como nome, descrição, etc;<br>
> Desejo ver uma linha do tempo com a primeira e a última aparição do herói;<br>
> Quero ver um carrossel com os quadrinhos em que o herói participou;<br>
> Desejo ter um ícone de retorno no topo da barra de navegação;<br>

***Quando eu:***<br>
> Acessar a página de perfil do herói, quero ver suas informações detalhadas, como nome e descrição;<br>
> Ver a primeira e a última aparição do herói em uma linha do tempo;<br>
> Navegar pelos quadrinhos em que o herói participou por meio de um carrossel;<br>
> Clicar no ícone de pesquisa, desejo que um campo de busca seja exibido, e os cartões se ajustem de acordo com a busca, exibindo resultados relacionados a heróis, quadrinhos, séries ou eventos;<br>
> Clicar em uma das opções de filtro, desejo que os cartões sejam filtrados para exibir apenas a categoria selecionada;<br>
> Clicar em um dos cartões, quero ser redirecionado para a página de informações detalhadas do item;<br>
> Clicar no ícone de retorno, desejo ser redirecionado de volta para a página inicial (Home);<br>

### *Critérios de aceite*
>- Todos os requisitos acima devem ser cumpridos;<br>
>- Ao clicar em um cartão, devo ser redirecionado para uma página com informações detalhadas sobre o item;<br>
>- O design da página deve ser o mais fiel possível ao layout presente no Figma;<br>

---

## Página de Histórias, Quadrinhos, Séries e Eventos

### Esta é uma página que deve ser criada de acordo com a sua criatividade. As informações abaixo devem servir como guia para o desenvolvimento.

***Requisitos:***<br>
>- Exibir a imagem da categoria quando disponível, ou uma imagem padrão caso não haja;<br>
>- Exibir o respectivo título, descrição e informações de acordo com os dados da API;<br>
>- Seguir o padrão de design da página de perfil do herói;<br>

### *Critérios de aceite*
>- Todos os requisitos acima devem ser cumpridos;<br>

---

# Documentação da Aplicação


>A partir deste ponto, você pode começar a escrever a documentação da sua aplicação. Descreva detalhes sobre como cada parte da aplicação foi desenvolvida, como os componentes se comunicam, como os dados da API da Marvel são consumidos e apresentados, quais tecnologias foram utilizadas, etc;

> Lembre-se de fornecer informações claras e completas para que outros desenvolvedores possam entender e contribuir com o código. Além disso, você pode incluir instruções sobre como executar o projeto localmente, como realizar testes e como realizar deploys.

> Boa sorte com o desenvolvimento da sua aplicação! Se tiver mais alguma dúvida ou precisar de assistência, fique à vontade para perguntar.


---