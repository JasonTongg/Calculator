let sqrt = document.getElementById('sqrt');
let negasi = document.getElementById('negasi');
let dot = document.getElementById('dot');
let reset = document.getElementById('reset');
let submit = document.getElementById('calculate');
let input = document.getElementById('input');
let calcstring = document.getElementById('calc');
let number = document.getElementsByClassName('number');
let operasi = document.getElementsByClassName('operasi');
let historyDiv = document.querySelector('.history h3');

let history = {};

let var1 = '',
  var2,
  operation;

let displayHistory = () => {
  let markup = `<div>
          <p>${history.var1} ${history.operation} ${history.var2} =</p>
          <p>${history.result}</p>
        </div>`;
  historyDiv.insertAdjacentHTML('afterend', markup);
};

let calculate = () => {
  console.log(var1, var2, operation);
  if (var1 && var2 && operation) {
    input.value = eval(`${var1}${operation}${var2}`);
  }
  history = {var1, var2, operation, result: input.value};
  displayHistory();
};

Array.from(number).forEach((item) =>
  item.addEventListener('click', (e) => {
    if (input.value === '0') {
      input.value = '';
    }
    input.value += e.target.innerHTML + '';
  })
);

Array.from(operasi).forEach((item) =>
  item.addEventListener('click', (e) => {
    var1 = input.value;
    var2 = '';
    if (e.target.innerHTML === 'x') {
      operation = '*';
    } else {
      operation = e.target.innerHTML;
    }

    input.value = '0';
    calcstring.innerHTML = `${var1} ${operation} ${var2 || ''}`;
  })
);

negasi.addEventListener('click', () => {
  input.value *= -1;
  calcstring.innerHTML = `Negate(${input.value * -1}) = `;
  historyDiv.insertAdjacentHTML(
    'afterend',
    `<div>
          <p>Negate(${input.value * -1}) = </p>
          <p>${input.value}</p>
        </div>`
  );
});

sqrt.addEventListener('click', () => {
  calcstring.innerHTML = `Sqrt(${input.value}) =`;
  historyDiv.insertAdjacentHTML(
    'afterend',
    `<div>
          <p>Sqrt(${input.value}) = </p>
          <p>${Math.sqrt(input.value).toFixed(4)}</p>
        </div>`
  );
  input.value = Math.sqrt(input.value).toFixed(4);
});

reset.addEventListener('click', () => {
  input.value = '0';
  calcstring.innerHTML = '';
});

submit.addEventListener('click', () => {
  var2 = input.value;
  calculate();
  calcstring.innerHTML = `${var1} ${operation} ${var2} = `;
});

window.addEventListener('keydown', (e) => {
  if (/^\d+$/.test(e.key) || e.key === '.') {
    if (input.value === '0') {
      input.value = '';
    }

    if (e.key === '.' && (input.value === '0' || input.value === '')) {
      input.value += '0.';
      return;
    }
    input.value += e.key;
  } else {
    if (e.key !== 'Enter') {
      var1 = input.value;
      var2 = '';
      operation = '';
      if (e.key === 'Backspace' || e.key === 'Delete') {
        input.value = input.value.slice(0, input.value.length - 1);
      } else if (e.key === '+') {
        operation = '+';
      } else if (e.key === '-') {
        operation = '-';
      } else if (e.key === '*') {
        operation = '*';
      } else if (e.key === '/') {
        operation = '/';
      } else if (e.key === '%') {
        operation = '%';
      } else if (e.key === '~') {
        input.value *= -1;
      } else {
        return;
      }
      input.value = '0';
      calcstring.innerHTML = `${var1} ${operation} ${var2 || ''}`;
    } else {
      var2 = input.value;
      calculate();
      calcstring.innerHTML = `${var1} ${operation} ${var2} = `;
    }
  }
});
