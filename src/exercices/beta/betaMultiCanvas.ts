import { MultiViewCanvas } from '../../lib/3d/3d_dynamique/multiviewCanvas'
import { THREE } from '../../lib/3d/3d_dynamique/threeInstance'
import { listeQuestionsToContenu } from '../../modules/outils'
import Exercice from '../Exercice'

export const uuid = 'threejs2'
export const titre = 'canvas multi vues'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}

export default class BetaThreeJs extends Exercice {
  version: 'menger' | 'huit-coins'
  level: number

  constructor() {
    super()
    this.version = 'huit-coins' // 'menger' | 'huit-coins'
    this.level = 1
    this.listeQuestions = []
    this.listeCorrections = []
  }

  nouvelleVersion() {
    this.listeQuestions = []
    this.listeCorrections = []
    const multiView = new MultiViewCanvas(800, 600, 4)

    multiView.render()
    this.listeQuestions[0] = '<div id="div1"></div>'
    listeQuestionsToContenu(this)

    // AJOUTER CET ÉVÉNEMENT for initialiser A-Frame après l'affichage
    document.addEventListener(
      'exercicesAffiches',
      () => {
        const parent = document.getElementById('div1')
        if (parent !== null) {
          parent.appendChild(multiView.canvas)
          multiView.setObjects(0, [
            new THREE.Mesh(
              new THREE.BoxGeometry(),
              new THREE.MeshStandardMaterial({ color: 0xff0000 }),
            ),
          ])
          multiView.setObjects(1, [
            new THREE.Mesh(
              new THREE.SphereGeometry(),
              new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
            ),
          ])
          multiView.setObjects(2, [
            new THREE.Mesh(
              new THREE.CylinderGeometry(),
              new THREE.MeshStandardMaterial({ color: 0x0000ff }),
            ),
          ])
          multiView.setObjects(3, [
            new THREE.Mesh(
              new THREE.PlaneGeometry(),
              new THREE.MeshStandardMaterial({ color: 0xffff00 }),
            ),
          ])
          multiView.render()
        } else {
          console.info('div1 pas trouvé')
        }
      },
      { once: true },
    )
  }
}
