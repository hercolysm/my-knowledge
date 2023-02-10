// renderiza um título dizendo “Olá, mundo!”
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);

// declaração de variável
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);

// resultado de chamar uma função JavaScript 
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

//  usar o JSX dentro de ifinstruções e forloops, atribuí-lo a variáveis, aceitá-lo como argumentos e retorná-lo de funções
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

//  usar aspas para especificar literais de string como atributos
const element = <div tabIndex="0"></div>;

// usar chaves para incorporar uma expressão JavaScript em um atributo
const element = <img src={user.avatarUrl} />;

// JSX representa objetos
// exemplo 01
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// exemplo 02
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
// exemplo 03
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

// Atualizando o elemento renderizado
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);

// Componentes
// exemplo 01
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// exemplo 02
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// os elementos também podem representar componentes definidos pelo usuário
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// Extraindo Componentes
// componente Comment
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

// dividir em componentes menores
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}















