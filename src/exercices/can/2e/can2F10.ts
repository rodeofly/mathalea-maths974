import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { extraireRacineCarree } from '../../../lib/outils/calculs'
import { texFractionReduite } from '../../../lib/outils/deprecatedFractions'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../../lib/outils/ecritures'
import { sp } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import Exercice from '../../Exercice'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import { propositionsQcm } from '../../../lib/interactif/qcm'
import { arrondi } from '../../../lib/outils/nombres'
export const titre = 'Résoudre une équation avec une fonction de référence*'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '27/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = '1380f'

export const refs = {
  'fr-fr': ['can2F10'],
  'fr-ch': ['1mCL3-1'],
}
export default class ResoudreEquationsFonctionDeReference2 extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1

    this.spacing = 2
  }

  nouvelleVersion() {
    let texte, texteCorr, k, b, c, props
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      switch (choice([1, 2, 3, 4, 5, 6])) {
        case 1:
          b = randint(-5, 5, 0)
          c = randint(-5, 5, 0)
          k = arrondi(c - b)
          texte = `L'ensemble des solutions $S$ de l'équation $x^2${ecritureAlgebrique(b)}=${c}$ est :
                 `
          if (k > 0) {
            if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: `$S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$`,
                    statut: true,
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false,
                  },
                  {
                    texte: `$S=\\{${extraireRacineCarree(k)[0]}\\}$`,
                    statut: false,
                  },
                ],
              }
            } else {
              if (extraireRacineCarree(k)[1] === k) {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\{-\\sqrt{${c - b}}${sp(1)};${sp(1)}\\sqrt{${c - b}}\\}$`,
                      statut: true,
                    },
                    {
                      texte: '$S=\\emptyset$',
                      statut: false,
                    },
                    {
                      texte: `$S=\\{\\sqrt{${c - b}}\\}$`,
                      statut: false,
                    },
                  ],
                }
              } else {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\{-${Math.sqrt(k)};${Math.sqrt(k)}\\}$`,
                      statut: true,
                    },
                    {
                      texte: `$S=\\{${Math.sqrt(k)}\\}$`,
                      statut: false,
                    },
                    {
                      texte: `$S=\\{${k}\\}$`,
                      statut: false,
                    },
                  ],
                }
              }
            }
          }

          if (k === 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\{0\\}$',
                  statut: true,
                },
                {
                  texte: '$S=\\{1}\\}$',
                  statut: false,
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false,
                },
              ],
            }
          }
          if (k < 0) {
            if (k === -1 || k === -4 || k === -9 || k === -16 || k === -25) {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true,
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)};${Math.sqrt(-k)}\\}$`,
                    statut: false,
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)}\\}$`,
                    statut: false,
                  },
                ],
              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true,
                  },
                  {
                    texte: `$S=\\{-\\sqrt{${-k}};\\sqrt{${-k}}\\}$`,
                    statut: false,
                  },
                  {
                    texte: `$S=\\{\\sqrt{${-k}}\\}$`,
                    statut: false,
                  },
                ],
              }
            }
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Résoudre dans $\\mathbb{R}$ :<br>
  
        $x^2${ecritureAlgebrique(b)}=${c}$`
          }

          if (b > 0) {
            texteCorr = `On isole $x^2$ :<br>
            
            $\\begin{aligned}
           x^2${ecritureAlgebrique(b)}&=${c}\\\\
           x^2${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
           x^2&=${c - b}
           \\end{aligned}$`
          } else {
            texteCorr = `On isole $x^2$ :<br>
            
            $\\begin{aligned}
           x^2${ecritureAlgebrique(b)}&=${c}\\\\
           x^2${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
           x^2&=${c - b}
           \\end{aligned}$`
          }
          if (k > 0) {
            if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
              texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k)}}$ et $\\sqrt{${texNombre(k)}}$.
              <br> Comme $-\\sqrt{${texNombre(k)}}=-${extraireRacineCarree(k)[0]}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}$ alors
              les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}$ et $${extraireRacineCarree(k)[0]}$.<br>
              Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$.`
            } else {
              if (extraireRacineCarree(k)[1] !== k) {
                texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k)}}$ et $\\sqrt{${texNombre(k)}}$. <br>
                  Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors
                  les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
                  Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
              } else {
                texteCorr += `<br>L'équation est de la forme $x^2=k$ avec $k=${c - b}>0$,
                  donc l'équation a deux solutions : $-\\sqrt{${c - b}}$ et $\\sqrt{${c - b}}$.<br>
                  Ainsi,  $S=\\{-\\sqrt{${c - b}}${sp(1)};${sp(1)}\\sqrt{${c - b}}\\}$.`
              }
            }
          }
          if (k === 0) {
            texteCorr += `
            <br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(k)}$, alors l'équation a une solution : $0$.<br>
            Ainsi, $S=\\{0\\}$. `
          }
          if (k < 0) {
            texteCorr += `
            <br>L'équation est de la forme $x^2=k$ avec $k=${texNombre(c - b)}$, alors l'équation n'a pas de solution.
              <br>Ainsi, $S=\\emptyset$. `
          }
          this.canEnonce = `Résoudre dans $\\mathbb{R}$ l'équation $x^2${ecritureAlgebrique(b)}=${c}$.`
          this.canReponseACompleter = ''
          break
        case 2:
          b = randint(-5, 5, 0)
          c = randint(-5, 5, 0)
          k = arrondi(b - c)
          texte = `L'ensemble des solutions $S$ de l'équation $-x^2${ecritureAlgebrique(b)}=${c}$ est :
           `
          if (k > 0) {
            if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: `$S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$`,
                    statut: true,
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false,
                  },
                  {
                    texte: `$S=\\{${extraireRacineCarree(k)[0]}\\}$`,
                    statut: false,
                  },
                ],
              }
            } else {
              if (extraireRacineCarree(k)[1] === k) {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$`,
                      statut: true,
                    },
                    {
                      texte: '$S=\\emptyset$',
                      statut: false,
                    },
                    {
                      texte: `$S=\\{\\sqrt{${k}}\\}$`,
                      statut: false,
                    },
                  ],
                }
              } else {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\{-${Math.sqrt(k)};${Math.sqrt(k)}\\}$`,
                      statut: true,
                    },
                    {
                      texte: `$S=\\{${Math.sqrt(k)}\\}$`,
                      statut: false,
                    },
                    {
                      texte: `$S=\\{${k}\\}$`,
                      statut: false,
                    },
                  ],
                }
              }
            }
          }

          if (k === 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\{0\\}$',
                  statut: true,
                },
                {
                  texte: '$S=\\{1}\\}$',
                  statut: false,
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false,
                },
              ],
            }
          }
          if (k < 0) {
            if (k === -1 || k === -4 || k === -9 || k === -16 || k === -25) {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true,
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)};${Math.sqrt(-k)}\\}$`,
                    statut: false,
                  },
                  {
                    texte: `$S=\\{-${Math.sqrt(-k)}\\}$`,
                    statut: false,
                  },
                ],
              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: '$S=\\emptyset$',
                    statut: true,
                  },
                  {
                    texte: `$S=\\{-\\sqrt{${-k}};\\sqrt{${-k}}\\}$`,
                    statut: false,
                  },
                  {
                    texte: `$S=\\{\\sqrt{${-k}}\\}$`,
                    statut: false,
                  },
                ],
              }
            }
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Résoudre dans $\\mathbb{R}$ :<br>
  
   $-x^2${ecritureAlgebrique(b)}=${c}$`
          }

          if (b > 0) {
            texteCorr = `On isole $x^2$ :<br>
            
            $\\begin{aligned}
     -x^2${ecritureAlgebrique(b)}&=${c}\\\\
     -x^2${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
     x^2&=${b - c}
     \\end{aligned}$`
          } else {
            texteCorr = `On isole $x^2$ :<br>
  
            $\\begin{aligned}
     -x^2${ecritureAlgebrique(b)}&=${c}\\\\
    - x^2${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
     x^2&=${b - c}
     \\end{aligned}$`
          }
          if (k > 0) {
            if (k === 1 || k === 4 || k === 9 || k === 16 || k === 25) {
              texteCorr += `<br>
  
              L'équation est de la forme $x^2=k$ avec $k=${texNombre(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k)}}$ et $\\sqrt{${texNombre(k)}}$.
        <br> Comme $-\\sqrt{${texNombre(k)}}=-${extraireRacineCarree(k)[0]}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}$ alors
        les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}$ et $${extraireRacineCarree(k)[0]}$.<br>
        Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\}$.`
            } else {
              if (extraireRacineCarree(k)[1] !== k) {
                texteCorr += `<br>
                L'équation est de la forme $x^2=k$ avec $k=${texNombre(k)}>0$, donc l'équation a deux solutions : $-\\sqrt{${texNombre(k)}}$ et $\\sqrt{${texNombre(k)}}$. <br>
            Comme $-\\sqrt{${k}}=-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $\\sqrt{${k}}=${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ alors
            les solutions de l'équation peuvent s'écrire plus simplement : $-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$ et $${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}$.<br>
            Ainsi,  $S=\\{-${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}${sp(1)};${sp(1)}${extraireRacineCarree(k)[0]}\\sqrt{${extraireRacineCarree(k)[1]}}\\}$.`
              } else {
                texteCorr += `<br>
                L'équation est de la forme $x^2=k$ avec $k=${k}>0$,
            donc l'équation a deux solutions : $-\\sqrt{${k}}$ et $\\sqrt{${k}}$.<br>
            Ainsi,  $S=\\{-\\sqrt{${k}}${sp(1)};${sp(1)}\\sqrt{${k}}\\}$.`
              }
            }
          }
          if (k === 0) {
            texteCorr += `<br>
            L'équation est de la forme $x^2=k$ avec $k=${texNombre(k)}$, alors l'équation a une solution : $0$.<br>
      Ainsi, $S=\\{0\\}$. `
          }
          if (k < 0) {
            texteCorr += `<br>
            L'équation est de la forme $x^2=k$ avec $k=${texNombre(k)}$, alors l'équation n'a pas de solution.
        <br>Ainsi, $S=\\emptyset$. `
          }
          this.canEnonce = `Résoudre dans $\\mathbb{R}$ l'équation $-x^2${ecritureAlgebrique(b)}=${c}$.`
          this.canReponseACompleter = ''
          break

        case 3:
          b = randint(-5, 5, 0)
          c = randint(-5, 5)
          k = arrondi(c - b)
          texte = `L'ensemble des solutions $S$ de l'équation $\\sqrt{x}${ecritureAlgebrique(b)}=${c}$ est :
                       `
          if (k > 0) {
            if (k !== 1) {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: `$S=\\{${k ** 2}\\}$`,
                    statut: true,
                  },
                  {
                    texte: `$S=\\{${2 * k}\\}$`,
                    statut: false,
                  },
                  {
                    texte: `$S=\\{${k}\\}$`,
                    statut: false,
                  },
                ],
              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: `$S=\\{${k}\\}$`,
                    statut: true,
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false,
                  },
                  {
                    texte: `$S=\\{${2 * k}\\}$`,
                    statut: false,
                  },
                ],
              }
            }
          }

          if (k < 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\emptyset$',
                  statut: true,
                },
                {
                  texte: `$S=\\{\\sqrt{${-k}}\\}$`,
                  statut: false,
                },
                {
                  texte: `$S=\\{${k ** 2}\\}$`,
                  statut: false,
                },
              ],
            }
          }
          if (k === 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\{0\\}$',
                  statut: true,
                },
                {
                  texte: `$S=\\{${k + 1}\\}$`,
                  statut: false,
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false,
                },
              ],
            }
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ :<br>
  
               $\\sqrt{x}${ecritureAlgebrique(b)}=${c}$`
          }
          if (b > 0) {
            texteCorr = `
            
            On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
              $\\begin{aligned}
              \\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
              \\sqrt{x}${ecritureAlgebrique(b)}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
              \\sqrt{x}&=${c - b}
                             \\end{aligned}$<br>`
          } else {
            texteCorr = `
            
            On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                             $\\begin{aligned}
                             \\sqrt{x}${ecritureAlgebrique(b)}&=${c}\\\\
                             \\sqrt{x}${ecritureAlgebrique(b)}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                             \\sqrt{x}&=${c - b}
                                            \\end{aligned}$<br>`
          }
          if (c - b < 0) {
            texteCorr += `
            L'équation est de la forme $\\sqrt{x}=k$ avec $k=${k}$. Comme $${k}<0$ alors l'équation n'admet pas de solution. <br>
  Ainsi,   $S=\\emptyset$.<br>
  `
          }
          if (c - b > 0 || c - b === 0) {
            texteCorr += `
            L'équation est de la forme $\\sqrt{x}=k$ avec $k=${c - b}$. Comme $${c - b}\\geqslant 0$ alors l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
  Ainsi $S=\\{${k ** 2}\\}$.
  `
          }
          this.canEnonce = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ l'équation $\\sqrt{x}${ecritureAlgebrique(b)}=${c}$.`
          this.canReponseACompleter = ''
          break
        case 4:
          b = randint(-5, 5, 0)
          c = randint(-5, 5)
          k = arrondi(b - c)
          texte = `L'ensemble des solutions $S$ de l'équation $${b}-\\sqrt{x}=${c}$ est :
                           `
          if (k > 0) {
            if (k !== 1) {
              if (k === 2) {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\{${k ** 2}\\}$`,
                      statut: true,
                    },
                    {
                      texte: '$S=\\emptyset$',
                      statut: false,
                    },
                    {
                      texte: `$S=\\{${k}\\}$`,
                      statut: false,
                    },
                  ],
                }
              } else {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\{${k ** 2}\\}$`,
                      statut: true,
                    },
                    {
                      texte: `$S=\\{${2 * k}\\}$`,
                      statut: false,
                    },
                    {
                      texte: `$S=\\{${k}\\}$`,
                      statut: false,
                    },
                  ],
                }
              }
            } else {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: `$S=\\{${k}\\}$`,
                    statut: true,
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false,
                  },
                  {
                    texte: `$S=\\{${2 * k}\\}$`,
                    statut: false,
                  },
                ],
              }
            }
          }

          if (k < 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\emptyset$',
                  statut: true,
                },
                {
                  texte: `$S=\\{\\sqrt{${-k}}\\}$`,
                  statut: false,
                },
                {
                  texte: `$S=\\{${k ** 2}\\}$`,
                  statut: false,
                },
              ],
            }
          }
          if (k === 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\{0\\}$',
                  statut: true,
                },
                {
                  texte: `$S=\\{${k + 1}\\}$`,
                  statut: false,
                },
                {
                  texte: '$S=\\emptyset$',
                  statut: false,
                },
              ],
            }
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ :<br>
  
                  $-\\sqrt{x}${ecritureAlgebrique(b)}=${c}$`
          }
          if (b > 0) {
            texteCorr = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                  $\\begin{aligned}
                  ${b}-\\sqrt{x}&=${c}\\\\
                  ${b}-\\sqrt{x}-${miseEnEvidence(b)}&=${c}-${miseEnEvidence(b)}\\\\
                  -\\sqrt{x}&=${c - b}\\\\
                  \\sqrt{x}&=${b - c}
                                 \\end{aligned}$<br>`
          } else {
            texteCorr = `On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                                 $\\begin{aligned}
                                 ${b}-\\sqrt{x}&=${c}\\\\
                                 ${b}-\\sqrt{x}+${miseEnEvidence(-b)}&=${c}+${miseEnEvidence(-b)}\\\\
                                 -\\sqrt{x}&=${c - b}\\\\
                                 \\sqrt{x}&=${b - c}
                                                \\end{aligned}$<br>`
          }
          if (k < 0) {
            texteCorr += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${k}$. Comme $${k}<0$ alors l'équation n'admet pas de solution. <br>
  Ainsi,   $S=\\emptyset$.<br>
  `
          }
          if (k > 0 || k === 0) {
            texteCorr += `L'équation est de la forme $\\sqrt{x}=k$ avec $k=${b - c}$. Comme $${b - c}\\geqslant0$ alors l'équation admet une solution : $${k}^2=${k ** 2}$.<br>
     Ainsi $S=\\{${k ** 2}\\}$.
    `
          }
          this.canEnonce = `Résoudre dans $[0${sp(1)};${sp(1)}+\\infty[$ l'équation $-\\sqrt{x}${ecritureAlgebrique(b)}=${c}$.`
          this.canReponseACompleter = ''
          break
        case 5:
          b = randint(-10, 10, 0)
          c = randint(-10, 10)
          k = c - b
          texte = `L'ensemble des solutions $S$ de l'équation $\\dfrac{1}{x}${ecritureAlgebrique(b)}=${c}$ est :
                         `
          if (k !== 0) {
            if (k === 1) {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                    statut: true,
                  },
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                    statut: false,
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false,
                  },
                ],
              }
            } else {
              if (k === -1) {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                      statut: true,
                    },
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                      statut: false,
                    },
                    {
                      texte: '$S=\\emptyset$',
                      statut: false,
                    },
                  ],
                }
              } else {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                      statut: true,
                    },
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                      statut: false,
                    },
                    {
                      texte: `$S=\\left\\{${k}\\right\\}$`,
                      statut: false,
                    },
                  ],
                }
              }
            }
          }

          if (k === 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\emptyset$',
                  statut: true,
                },
                {
                  texte: '$S=\\left\\{0\\right\\}$',
                  statut: false,
                },
                {
                  texte: '$S=\\left\\{-1\\right\\}$',
                  statut: false,
                },
              ],
            }
          }
          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `
                       Résoudre dans $\\mathbb{R}^*$ :<br>
  
                        $\\dfrac{1}{x}${ecritureAlgebrique(b)}=${c}$`
          }

          texteCorr = `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
              $\\begin{aligned}
              \\dfrac{1}{x}${ecritureAlgebrique(b)}&=${c}\\\\
              \\dfrac{1}{x}${ecritureAlgebrique(b)}+${miseEnEvidence(ecritureParentheseSiNegatif(-b))}&=${c}+${miseEnEvidence(-b)}\\\\
              \\dfrac{1}{x}&=${c - b}
                                          \\end{aligned}$<br>`

          if (k === 0) {
            texteCorr += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation n'admet pas de solution.<br>
  Ainsi,   $S=\\emptyset$.
  `
          }
          if (k !== 0) {
            texteCorr += `$k=${k}$ et $${k}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation admet une solution :
  $${texFractionReduite(1, k)}$.<br>
  Ainsi $S=\\left\\{${texFractionReduite(1, k)}\\right\\}$.
  `
          }
          this.canEnonce = `Résoudre dans $\\mathbb{R}^*$ l'équation $\\dfrac{1}{x}${ecritureAlgebrique(b)}=${c}$.`
          this.canReponseACompleter = ''
          break
        case 6:
        default:
          b = randint(-10, 10, 0)
          c = randint(-10, 10)
          k = b - c
          texte = `L'ensemble des solutions $S$ de l'équation $${b}-\\dfrac{1}{x}=${c}$ est :
                             `
          if (k !== 0) {
            if (k === 1) {
              this.autoCorrection[i] = {
                enonce: texte,

                propositions: [
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                    statut: true,
                  },
                  {
                    texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                    statut: false,
                  },
                  {
                    texte: '$S=\\emptyset$',
                    statut: false,
                  },
                ],
              }
            } else {
              if (k === -1) {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                      statut: true,
                    },
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                      statut: false,
                    },
                    {
                      texte: '$S=\\emptyset$',
                      statut: false,
                    },
                  ],
                }
              } else {
                this.autoCorrection[i] = {
                  enonce: texte,

                  propositions: [
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, k)}\\right\\}$`,
                      statut: true,
                    },
                    {
                      texte: `$S=\\left\\{${texFractionReduite(1, -k)}\\right\\}$`,
                      statut: false,
                    },
                    {
                      texte: `$S=\\left\\{${k}\\right\\}$`,
                      statut: false,
                    },
                  ],
                }
              }
            }
          }

          if (k === 0) {
            this.autoCorrection[i] = {
              enonce: texte,

              propositions: [
                {
                  texte: '$S=\\emptyset$',
                  statut: true,
                },
                {
                  texte: '$S=\\left\\{0\\right\\}$',
                  statut: false,
                },
                {
                  texte: '$S=\\left\\{-1\\right\\}$',
                  statut: false,
                },
              ],
            }
          }
          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `
                           Résoudre dans $\\mathbb{R}^*$ :<br>
  
                           $${b}-\\dfrac{1}{x}=${c}$`
          }

          texteCorr = `On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                  $\\begin{aligned}
                  ${b}-\\dfrac{1}{x}&=${c}\\\\
                  ${b}-\\dfrac{1}{x}+${miseEnEvidence(ecritureParentheseSiNegatif(-b))}&=${c}+${miseEnEvidence(ecritureParentheseSiNegatif(-b))}\\\\
                  \\dfrac{1}{x}&=${b - c}
                                              \\end{aligned}$<br>`

          if (k === 0) {
            texteCorr += `L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation n'admet pas de solution.<br>
      Ainsi,   $S=\\emptyset$.
      `
          }
          if (k !== 0) {
            texteCorr += `$k=${k}$ et $${k}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${k}$. Donc l'équation admet une solution :
      $${texFractionReduite(1, k)}$.<br>
      Ainsi $S=\\left\\{${texFractionReduite(1, k)}\\right\\}$.
      `
          }
          this.canEnonce = `Résoudre dans $\\mathbb{R}^*$ l'équation $${b}-\\dfrac{1}{x}=${c}$.`
          this.canReponseACompleter = ''
          break
      }
      if (this.questionJamaisPosee(i, k, b, c)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        listeQuestionsToContenu(this)
        i++
      }
      cpt++
    }
  }
}
