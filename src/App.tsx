import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import AssetTypes from './pages/project/AssetTypes'
import TypeSchemes from './pages/project/TypeSchemes'
import AssetModels from './pages/project/AssetModels'
import ScreenScheme from './pages/project/ScreenScheme'
import CustomFields from './pages/project/CustomFields'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/project/:id/asset-types" element={<AssetTypes />} />
        <Route path="/project/:id/type-schemes" element={<TypeSchemes />} />
        <Route path="/project/:id/models" element={<AssetModels />} />
        <Route path="/project/:id/screen-scheme" element={<ScreenScheme />} />
        <Route path="/project/:id/custom-fields" element={<CustomFields />} />

      </Routes>
    </Router>
  )
}

export default App