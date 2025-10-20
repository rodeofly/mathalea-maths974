import { choice } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique, ecritureParentheseSiNegatif, rienSi1 } from '../../lib/outils/ecritures'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '28/08/2025'
export const uuid = '7092d'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 *
 * @author Gilles Mora +claude 
 *
 */
export const refs = {
  'fr-fr': ['1A-F3-1'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Déterminer une image par une fonction affine sans son expression'
export default class AutoF3a extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = `On considère une fonction affine $f$ telle que $f(2)=7$ et $f(5)=13$.<br>
    L'image de $7$ par cette fonction affine est : `
    this.correction = `$f$ est une fonction affine, elle est donc de la forme $f(x)=mx+p$.<br>
     
    $\\begin{aligned}
    m&=\\dfrac{f(5)-f(2)}{5-2}\\\\
    &=\\dfrac{13-7}{3}\\\\
    &=2
    \\end{aligned}$<br>
    On a donc $f(x)=2x+p$.<br> Pour déterminer $p$, on utilise la valeur de $f(2)$ :<br>
    $\\begin{aligned}
    f(2)&=2\\times 2+p\\\\
    7&=4+p\\\\
    p&=3
    \\end{aligned}$<br>
    On a donc $f(x)=2x+3$.<br>
    
    L'image de $7$ par cette fonction est :<br>
    $\\begin{aligned}
    f(7)&=2\\times 7+3\\\\
    &=14+3\\\\
    &=${miseEnEvidence(17)}
    \\end{aligned}$
    `

    this.reponses = [
      '$17$',
      '$20$',
      '$2$',
      '$5$'
    ]
  }

  versionAleatoire = () => {
  // Choix des antécédents (simples pour faciliter les calculs)
  const x1 = randint(-5, 5,0)
  const x2 = randint(x1 + 2, x1 + 5) // Assure que x2 > x1
  
  // Choix du coefficient directeur m (valeurs simples)
  const m = choice([1, 2, 3, -1, -2])
  
  // Choix de l'ordonnée à l'origine p (valeurs simples)
  let p = randint(-5, 10)
  
  // Calcul des images correspondantes
  let y1 = m * x1 + p
  let y2 = m * x2 + p
  
  // Question sur l'image de la somme des antécédents
  const xDemande = x1 + x2
  let bonneReponse = m * xDemande + p
  let sommeDesImages = y1 + y2
  
  // Vérification que la bonne réponse n'est pas égale à la somme des images
  // Si c'est le cas, on ajuste légèrement les valeurs
  if (bonneReponse === sommeDesImages) {
    // On change p pour éviter cette égalité
    p = p + choice([-2, -1, 1, 2])
    y1 = m * x1 + p
    y2 = m * x2 + p
    bonneReponse = m * xDemande + p
    sommeDesImages = y1 + y2
  }
  
  // Autres distracteurs plausibles
  const distracteur2 = bonneReponse + (y2 - y1) // Erreur en ajoutant la pente
  const distracteur3 = m * xDemande // Oubli de l'ordonnée à l'origine
  
  // Construction de l'énoncé
  this.enonce = `On considère une fonction affine $f$ telle que $f(${x1})=${y1}$ et $f(${x2})=${y2}$.<br>
  L'image de $${xDemande}$ par cette fonction affine est :`
  
  // Construction de la correction
  this.correction = `$f$ est une fonction affine, elle est donc de la forme $f(x)=mx+p$.<br>
   
  $\\begin{aligned}
  m&=\\dfrac{f(${x2})-f(${x1})}{${x2}-${ecritureParentheseSiNegatif(x1)}}\\\\
  &=\\dfrac{${y2}${y1 >= 0 ? '-' : '+'}${Math.abs(y1)}}{${x2 - x1}}\\\\
  &=${m}
  \\end{aligned}$<br>
  On a donc $f(x)=${rienSi1(m)}x+p$.<br> Pour déterminer $p$, on utilise la valeur de $f(${x1})$ :<br>
  $\\begin{aligned}
  f(${x1})&=${m===1 ? `${x1}`: `${m}\\times ${ecritureParentheseSiNegatif(x1)}`}+p\\\\
  ${y1}&=${m * x1}+p\\\\
  p&=${p}
  \\end{aligned}$<br>
  On a donc $f(x)=${rienSi1(m)}x${ecritureAlgebrique(p)}$.<br>
  
  L'image de $${xDemande}$ par cette fonction est :<br>
  $\\begin{aligned}
  f(${xDemande})&=${m===1 ? `${xDemande}`: `${m}\\times ${ecritureParentheseSiNegatif(xDemande)}`}  ${ecritureAlgebrique(p)}
  ${m===1 ? `\\\\`: ` \\\\&=${m * xDemande}${ecritureAlgebrique(p)}\\\\`} 
  &=${miseEnEvidence(bonneReponse)}
  \\end{aligned}$
  `

  // Réponses avec la bonne réponse et les 3 distracteurs
  this.reponses = [
    `$${bonneReponse}$`,
    `$${sommeDesImages}$`,
    `$${distracteur2}$`,
    `$${distracteur3}$`
  ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
