
import './App.css'
import MatrixUi from './matrixUI'

function App() {
  return(
    <div className='matrixLayout'>
          <MatrixUi route='/matrix1'></MatrixUi>
          <MatrixUi route='/matrix2'></MatrixUi>
    </div>
  )
}

export default App
