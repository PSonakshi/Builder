import React , {Children, useMemo} from 'react'
import { FileTextIcon, FolderOpenIcon } from 'lucide-react'

function getFileIcon(fileName) {
    const extension = fileName.split('.').pop()?.toLowerCase()

    switch (extension) {
        case 'css':
            return 'text-blue-500'
        case 'html':
            return 'text-orange-500'
        case 'js':
          return 'text-yellow-300'
        case 'jsx':
            return 'text-cyan-500'
        case 'json':
            return 'text-yellow-500'
        default:
            return 'text-zinc-500'
    }
}

function buildTree(paths){
    const root =[];
    for (const filePath of paths.sort()){ 
        const parts = filePath.split("/").filter(Boolean)
        let current = root;

        for(let i = 0; i < parts.length; i++){
            const name = parts[i];
            const isLast = i === parts.length-1;
            const fullpath = "/" + parts.slice(0 , i+1).join("/")
            let existing = current.find((n)=> n.name === name)
            if(!existing){
                existing = {
                    name,
                    path : fullpath,
                    isDir : !isLast,
                    children :[],
                };
                current.push(existing);
            }
            current = existing.children;
        }

    }


    return root;
}


function TreeItem({node , activeFile , onFileSelect , depth =0 }){
    const isActive = node.path === activeFile;
    if(node.isDir){
        return (
            <div> 
            <div className='flex items-center gap-2 py-1 px-2 text-xs text-zinc-400 select-none'
                style = {{paddingLeft : `${depth * 12 +8}px `}}>
                 <FolderOpenIcon size={14} className={`text-zinc-800 opacity-60`} />
                <span>{node.name}</span>
            </div>
            {node.children.map((child)=> (<TreeItem key={child.path} node={child} activeFile={activeFile} onFileSelect={onFileSelect} depth={depth + 1}/>))}
            </div>
        )
    }
    return(
        <button
            onClick={() => onFileSelect(node.path)}
            className={`flex items-center gap-2 py-1 px-2 text-xs cursor-pointer ${
                isActive
                    ? 'bg-zinc-100 text-zinc-900 font-medium'
                    : 'text-zinc-400 hover:bg-zinc-100'
            }`}
            style={{paddingLeft: `${depth * 12 + 8}px`}}
        >
            <FileTextIcon size={14} className={getFileIcon(node.name)} />
            <span className='truncate'>{node.name}</span>
        </button>
    )

}
const FileExplorer = ({files,activeFile ,onFileSelect}) => {
    const tree = useMemo(()=> buildTree(Object.keys(files)),[files])
  return (
    <div className='py-2 overflow-y-auto hide-scrollbar'>
        <p className='px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400'>Files </p>
         {tree.map((node)=>(
            <TreeItem key={node.path} node={node} activeFile={activeFile} onFileSelect={onFileSelect} />
         ))}
        </div>
  )
}

export default FileExplorer





















































// import React, { useState, useMemo } from 'react'
// import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react'
// import { useAppContext } from '../context/AppContext'

// const FileExplorer = () => {
//   const { activeProject, activeFile, setActiveFile } = useAppContext()
//   const [expandedFolders, setExpandedFolders] = useState(new Set(['']))

//   // Build tree structure from file paths
//   const fileTree = useMemo(() => {
//     if (!activeProject?.files) return {}
    
//     const tree = {}
    
//     Object.keys(activeProject.files).forEach(filePath => {
//       const parts = filePath.split('/').filter(Boolean)
//       let current = tree
      
//       for (let i = 0; i < parts.length; i++) {
//         const part = parts[i]
//         const isFile = i === parts.length - 1
//         const path = parts.slice(0, i + 1).join('/')
        
//         if (isFile) {
//           if (!current.files) current.files = []
//           current.files.push({ name: part, path: '/' + path })
//         } else {
//           if (!current[part]) {
//             current[part] = { files: [] }
//           }
//           current = current[part]
//         }
//       }
//     })
    
//     return tree
//   }, [activeProject?.files])

//   const toggleFolder = (folderPath) => {
//     setExpandedFolders(prev => {
//       const newSet = new Set(prev)
//       if (newSet.has(folderPath)) {
//         newSet.delete(folderPath)
//       } else {
//         newSet.add(folderPath)
//       }
//       return newSet
//     })
//   }

//   const renderTree = (node, parentPath = '') => {
//     const items = []

//     // Render folders
//     Object.entries(node).forEach(([key, value]) => {
//       if (key === 'files') return
      
//       const folderPath = parentPath ? `${parentPath}/${key}` : key
//       const isExpanded = expandedFolders.has(folderPath)

//       items.push(
//         <div key={`folder-${folderPath}`}>
//           <div
//             onClick={() => toggleFolder(folderPath)}
//             className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 cursor-pointer rounded text-sm text-zinc-700"
//           >
//             {isExpanded ? (
//               <ChevronDown size={16} className="text-zinc-500" />
//             ) : (
//               <ChevronRight size={16} className="text-zinc-500" />
//             )}
//             <Folder size={16} className="text-amber-500" />
//             <span className="font-medium">{key}</span>
//           </div>

//           {isExpanded && (
//             <div className="pl-4">
//               {renderTree(value, folderPath)}
//             </div>
//           )}
//         </div>
//       )
//     })

//     // Render files
//     if (node.files && node.files.length > 0) {
//       node.files.forEach(file => {
//         const isActive = activeFile === file.path
//         items.push(
//           <div
//             key={`file-${file.path}`}
//             onClick={() => setActiveFile(file.path)}
//             className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm cursor-pointer ${
//               isActive
//                 ? 'bg-blue-100 text-blue-900 font-medium'
//                 : 'text-zinc-700 hover:bg-zinc-100'
//             }`}
//           >
//             <File size={16} className="text-blue-500" />
//             <span className="truncate">{file.name}</span>
//           </div>
//         )
//       })
//     }

//     return items
//   }

//   if (!activeProject?.files || Object.keys(activeProject.files).length === 0) {
//     return (
//       <div className="p-4 text-center text-zinc-500 text-sm">
//         No files yet
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col h-full overflow-y-auto">
//       <div className="p-3 border-b border-zinc-200">
//         <h3 className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Files</h3>
//       </div>
//       <div className="flex-1 overflow-y-auto p-2">
//         {renderTree(fileTree)}
//       </div>
//     </div>
//   )
// }

// export default FileExplorer