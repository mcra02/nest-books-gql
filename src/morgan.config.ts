import * as chalk from 'chalk';
import * as morgan from 'morgan';

export const morganMiddleware = morgan(function(tokens, req, res) {
  return [
    '\n',
    chalk.hex('#FF828F').bold('💉 Morgan --> '),
    chalk.hex('#4DB5FA').bold(tokens.method(req, res)),
    chalk.hex('#9887FA').bold(tokens.status(req, res)),
    chalk.hex('#FF828F').bold(tokens.url(req, res)),
    chalk.hex('#7DFA8E').bold(tokens['response-time'](req, res) + ' ms'),
    // chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
    // chalk.yellow(tokens['remote-addr'](req, res)),
    chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
    // chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
    '\n',
  ].join(' ');
});
