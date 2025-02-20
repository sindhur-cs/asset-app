import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import AssetTypes from './pages/project/AssetTypes'
import TypeSchemes from './pages/project/TypeSchemes'
import AssetModels from './pages/project/AssetModels'
import AssetModelScheme from './pages/project/ScreenScheme'
import CustomFields from './pages/project/CustomFields'
import FieldConfigurations from './pages/project/FieldConfigurations'
import FieldConfigMappings from './pages/project/FieldConfigMappings'
import FieldTable from './pages/project/FieldTable'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/project/:id/fields" element={<FieldTable />} />
        <Route path="/asset-types" element={<AssetTypes />} />
        <Route path="/type-schemes" element={<TypeSchemes />} />
        <Route path="/models" element={
          <DndProvider backend={HTML5Backend}>
            <AssetModels />
          </DndProvider>
        } />
        <Route path="/asset-model-scheme" element={<AssetModelScheme />} />
        <Route path="/custom-fields" element={<CustomFields />} />
        <Route path="/field-configurations" element={<FieldConfigurations />} />
        <Route path="/field-configuration-mappings" element={<FieldConfigMappings />} />
      </Routes>
    </Router>
  )
}

export default App