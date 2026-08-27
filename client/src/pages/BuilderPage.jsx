import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import BuilderHeader from '../components/BuilderHeader'
import Loading from '../components/Loading'
import { FolderTreeIcon, MessageSquare, MessageSquareIcon } from 'lucide-react'
import ChatPanel from '../components/ChatPanel'
import FileExplorer from '../components/FileExplorer'
import PreviewPanel from '../components/PreviewPanel'
import AgentProgressDashboard from '../components/AgentProgressDashboard'
import PublishModel from '../components/PublishModel'
import api from '../api/api'
import toast from 'react-hot-toast'
import { exportProjectZip } from '../utils/exportProject'

const BuilderPage = () => {

   const {id} = useParams()
  const navigate = useNavigate()
   const [leftTab , setLeftTab] = useState("chat");
   const [publishing , setPublishing] = useState(false);
   const [publishUrl , setPublishUrl] = useState(null);
   const {activeProject , loadingActiveProject , activeFile, showCode , setActiveFile , setShowCode , loadProject ,logout, chatLoading, handleChat} = useAppContext()
 

  useEffect(()=>{
    if(!id) return;
    loadProject(id)
  },[id])


  useEffect(()=>{
    if(!id || !activeProject) return;
    if (activeProject.status === "pending" || activeProject.status === "generating"){
      const interval = setInterval(()=>{
        loadProject(id , true)
      }, 1500)
      return () => clearInterval(interval)
    }
  },[id, loadProject, activeProject])



const handleOpenPreview = () => {
  if(!id) return;
  navigate(`/preview/${id}`)
} 

const handlePublish = async () => {
  if(!id) return;
  setPublishing(true)
  try{
    await api.post(`/api/projects/${id}/publish`);
    const url = `${window.location.origin}/publish/${id}`;
    setPublishUrl(url);
    toast.success("Website published successfully!")
  } catch (error){
   console.error("Publish failed:" , err);
   toast.error(err?.response?.data?.error || "Publish Failed");
  } finally {
    setPublishing(false)
  }
  
}
const handleDownload = () => {
  if(!activeProject) return;
  exportProjectZip(activeProject)
  
}

if(loadingActiveProject || !activeProject){
  return <Loading />
}


  return (
    <div className='h-screen flex flex-col bg-white overflow-hidden text-zinc-900 relative '>
      <BuilderHeader
      projectName={activeProject.name}
      version={activeProject.version}
      showCode={showCode}
      publishing={publishing}
      onToggleShowCode={()=> setShowCode(!showCode)}
      onOpenPreview={handleOpenPreview}
      onPublish={handlePublish}
      onDownlaod={handleDownload}
      onBack={() => navigate("/")}
      onLogout={logout}
      />


    <div className='flex-1 flex overflow-hidden'>
      <div className='w-[320px] shrink-0 flex flex-col border-r border-zinc-200 bg-white'>
        <div className='flex border-b border-zinc-100'>
          <button onClick={()=> setLeftTab("chat")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "chat" ? "text-zinc-900 border-b-2 border-zinc-900":""}`}   >
            <MessageSquareIcon size={13} /> Chat
          </button>
          <button onClick={()=> setLeftTab("files")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "files" ? "text-zinc-900 border-b-2 border-zinc-900":""}`}   >
            <FolderTreeIcon size={13} /> Files
          </button>
        </div>
         


         <div className='flex-1 overflow-hidden'>
          {
            leftTab === "chat"?(
              <ChatPanel messages={activeProject.messages} onSend={handleChat} loading={chatLoading} />
            ):(
              <FileExplorer
                files={activeProject.files}
                activeFile={activeFile}
                onFileSelect={(path)=>{
                  setActiveFile(path);
                  setShowCode(true);
                }}
              />
            )
          }

         </div>
      </div>
      

      <div className='flex-1 overflow-hidden'>
        {activeProject.status === "pending" || activeProject.status === "generating" || activeProject.status === "failed"? (
          <AgentProgressDashboard project={activeProject} /> ) :( <PreviewPanel project={activeProject} activeFile ={activeFile} showCode ={showCode}/>
        )}
      </div>
    </div>
 {publishUrl && <PublishModel publishUrl={publishUrl} onClose={()=> setPublishUrl(null)}/>}
    </div>
  )
}

export default BuilderPage