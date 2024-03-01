
import './App.css'
import MatrixUi from './matrixUI'

function App() {
  return(
    <div className='matrixLayout'>
          <MatrixUi route='/matrix1' name='Matrix 1'></MatrixUi>
          <MatrixUi route='/matrix2' name='Matrix 2'></MatrixUi>
    </div>
  )
}

export default App
