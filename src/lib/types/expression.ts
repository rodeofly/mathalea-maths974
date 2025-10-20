export type Operator = '+' | '-' | '\\times' | '\\div' | '^'

export interface ExpressionNode {
  operator: Operator
  left: ExpressionNode | number | string
  right: ExpressionNode | number | string
}

export type Expression = ExpressionNode | number | string

/**
 * Analyse un arbre de calculs avec priorité et fournit une string avec uniquement les parenthèses utiles
  const example: Expression = {
    operator: '+',
    left: {
        operator: '*',
        left: 'a',
        right: 'b'
    },
    right: {
        operator: '^',
        left: 'c',
        right: 'd'
    }
  }
  parseExpression(example, 0)
  resultat :
  a * b + c^d
 * @param expression
 * @param parentPrecedence
 * @param position branche du parent est à gauche ou à droite
 * @returns
 */
export function parseExpression(
  expression: Expression,
  parentPrecedence = 0,
  position: 'g' | 'd' | '' = '',
): string {
  if (typeof expression === 'number' || typeof expression === 'string') {
    // Si c'est un nombre ou une variable, retournez-le directement
    return expression.toString()
  }

  if ('operator' in expression) {
    const precedence = getOperatorPrecedence(expression.operator)
    const left = parseExpression(expression.left, precedence, 'g')
    const right = parseExpression(expression.right, precedence, 'd') // Associativité à gauche pour la plupart des opérateurs

    // Ajout de parenthèses si la priorité du parent est plus élevée que celle de l'opérateur actuel
    let shouldWrap = false
    if (position === 'd' && precedence === parentPrecedence) shouldWrap = true
    if (position === 'g' && precedence === parentPrecedence) shouldWrap = false
    if (precedence < parentPrecedence) shouldWrap = true
    const expressionString = `${left} ${expression.operator} ${right}`
    return shouldWrap ? `(${expressionString})` : expressionString
  }
  throw new Error('Expression invalide')
}

function getOperatorPrecedence(operator: Operator | ''): number {
  switch (operator) {
    case '^':
      return 3
    case '\\times':
    case '\\div':
      return 2
    case '+':
    case '-':
      return 1
    default:
      return 0 // Pas d'opérateur
  }
}
