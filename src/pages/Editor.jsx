import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import { FaPlay, FaRegClipboard, FaSave, FaCog, FaExpandAlt, FaCompressAlt, FaSpinner, FaTerminal, FaBars, FaCheck, FaTimes, FaCode, FaMobileAlt, FaArrowLeft } from 'react-icons/fa';

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const navigate = useNavigate(); // Hook for navigation
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCode, setSelectedCode] = useState("");
  const editorRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [fontSize, setFontSize] = useState(16);
  const [outputConfig, setOutputConfig] = useState({
    wrap: true,
    fontSize: 14,
    showLineNumbers: true
  });
  const [loadingState, setLoadingState] = useState({
    status: '',
    progress: 0
  });
  const [executionSteps, setExecutionSteps] = useState({
    compiling: false,
    running: false,
    completed: false,
    failed: false
  });
  const [mobileView, setMobileView] = useState('editor'); // 'editor' | 'output'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project function
  const saveProject = () => {
    const trimmedCode = code?.toString().trim();
    console.log('Saving code:', trimmedCode);

    return fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.msg);
      }
      return data;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveProject();
      toast.success('Project saved successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to save code');
    } finally {
      setIsSaving(false);
    }
  };

  // Shortcut handler for saving with Ctrl+S
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault(); // Prevent browser's default save behavior
      saveProject(); // Call the save function
    }
  };

  // Add and clean up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code]); // Reattach when `code` changes

  const runProject = async () => {
    setIsRunning(true);
    setExecutionSteps({
      compiling: true,
      running: false,
      completed: false,
      failed: false
    });
    
    try {
      // Simulate compilation step
      setLoadingState({ status: 'Compiling code...', progress: 25 });
      await new Promise(r => setTimeout(r, 500));
      
      setExecutionSteps(prev => ({ ...prev, compiling: false, running: true }));
      setLoadingState({ status: 'Executing program...', progress: 50 });

      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: data.projLanguage,
          version: data.version,
          files: [{
            filename: `main.${data.projLanguage}`,
            content: code
          }]
        })
      });

      setLoadingState({ status: 'Processing output...', progress: 75 });
      const result = await response.json();

      if (result.run.code === 1) {
        setExecutionSteps(prev => ({ ...prev, running: false, failed: true }));
        setError(true);
        toast.error('Execution failed!', {
          position: 'bottom-right',
          autoClose: 3000
        });
      } else {
        setExecutionSteps(prev => ({ ...prev, running: false, completed: true }));
        setLoadingState({ status: 'Completed successfully', progress: 100 });
        toast.success('Code executed successfully!', {
          position: 'bottom-right',
          autoClose: 2000
        });
      }

      // Format and set output
      const formattedOutput = result.run.output.split('\n').map((line, i) => ({
        line: i + 1,
        content: line,
        type: result.run.code === 1 ? 'error' : 'output'
      }));

      setOutput(formattedOutput);

    } catch (err) {
      setExecutionSteps(prev => ({ ...prev, running: false, failed: true }));
      setError(true);
      toast.error('Execution failed: ' + (err.message || 'Unknown error'), {
        position: 'bottom-right'
      });
    } finally {
      setIsRunning(false);
      setTimeout(() => {
        setExecutionSteps({
          compiling: false,
          running: false,
          completed: false,
          failed: false
        });
        setLoadingState({ status: '', progress: 0 });
      }, 2000);
    }
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    
    // Add selection change listener
    editor.onDidChangeCursorSelection((e) => {
      const selection = editor.getModel().getValueInRange(e.selection);
      if (selection) {
        setSelectedCode(selection);
      }
    });
  }

  const runSelectedCode = () => {
    const codeToRun = selectedCode || "print('Hello World')"; // Default to Hello World if no selection
    setIsRunning(true);
    setOutput("");
    setError(false);
    
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: data?.projLanguage || 'python',
        version: data?.version || '3.9.0',
        files: [{
          content: codeToRun
        }]
      })
    })
    .then(res => res.json())
    .then(data => {
      setOutput(data.run.output || 'No output');
      setError(data.run.code === 1);
      if (data.run.code === 1) {
        toast.error('Execution failed');
      }
    })
    .catch(err => {
      toast.error('Failed to run code');
      setError(true);
    })
    .finally(() => {
      setIsRunning(false);
    });
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      } else if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        runProject();
      } else if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setIsFullScreen(!isFullScreen);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullScreen]);

  // Handler for back navigation
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md mr-2"
              aria-label="Go back"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <FaCode className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <h2 className="font-medium text-gray-800 dark:text-white">
              {data?.name || 'Untitled'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              <FaSave className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setMobileView(prev => prev === 'editor' ? 'output' : 'editor')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              {mobileView === 'editor' ? <FaTerminal className="w-5 h-5" /> : <FaCode className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Header - hide on mobile */}
        <div className="hidden md:block border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white group">
                {data?.name || 'Untitled'}
                <span className="ml-2 text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                  ({data?.projLanguage})
                </span>
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mr-2">
                <button
                  onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                  className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  A-
                </button>
                <span className="px-2 text-sm text-gray-600 dark:text-gray-300">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                  className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  A+
                </button>
              </div>

              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center space-x-2 transition-all hover:scale-105"
                title="Save (Ctrl + S)"
              >
                <FaSave className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {executionSteps.compiling && (
                    <div className="flex items-center gap-2 text-yellow-500">
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Compiling...</span>
                    </div>
                  )}
                  {executionSteps.running && (
                    <div className="flex items-center gap-2 text-blue-500">
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Running...</span>
                    </div>
                  )}
                  {executionSteps.completed && (
                    <div className="flex items-center gap-2 text-green-500">
                      <FaCheck className="w-4 h-4" />
                      <span className="text-sm">Completed</span>
                    </div>
                  )}
                  {executionSteps.failed && (
                    <div className="flex items-center gap-2 text-red-500">
                      <FaTimes className="w-4 h-4" />
                      <span className="text-sm">Failed</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={runProject}
                  disabled={isRunning}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    isRunning 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-lg hover:shadow-green-500/25'
                  } text-white font-medium`}
                >
                  {isRunning ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span>{loadingState.status}</span>
                    </>
                  ) : (
                    <>
                      <FaPlay className="w-4 h-4" />
                      <span>Run Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor and Output */}
        <div className={`flex flex-1 overflow-hidden ${isFullScreen ? 'fixed inset-0 z-50 pt-16' : ''}`}>
          {/* Editor Panel */}
          <div className={`
            ${isMobile ? (mobileView === 'editor' ? 'flex' : 'hidden') : 'flex'} 
            ${isFullScreen ? 'w-3/5' : 'w-full md:w-1/2'} 
            flex-col transition-all duration-300
          `}>
            <Editor2
              onMount={handleEditorDidMount}
              onChange={(newCode) => setCode(newCode || '')}
              theme={localStorage.getItem('theme') === 'dark' ? "vs-dark" : "light"}
              height="calc(100vh - 120px)"
              language={data?.projLanguage || 'plaintext'}
              value={code}
              options={{
                ...outputConfig,
                fontSize: isMobile ? Math.max(16, fontSize) : fontSize,
                minimap: { enabled: !isMobile },
                lineNumbers: isMobile ? 'off' : 'on'
              }}
            />
          </div>
          
          {/* Output Panel */}
          <div className={`
            ${isMobile ? (mobileView === 'output' ? 'flex' : 'hidden') : 'flex'}
            ${isFullScreen ? 'w-2/5' : 'w-full md:w-1/2'} 
            border-l border-gray-200 dark:border-gray-700 
            flex-col transition-all duration-300
          `}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaTerminal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium text-gray-800 dark:text-white">Console Output</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOutputConfig(prev => ({ ...prev, wrap: !prev.wrap }))}
                      className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                      title="Toggle Word Wrap"
                    >
                      <FaBars className="w-4 h-4" />
                    </button>
                    <button
                      onClick={runProject}
                      disabled={isRunning}
                      className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-md flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg"
                    >
                      {isRunning ? (
                        <>
                          <FaSpinner className="w-4 h-4 animate-spin" />
                          <span className="text-sm">{loadingState.status}</span>
                        </>
                      ) : (
                        <>
                          <FaPlay className="w-4 h-4" />
                          <span className="text-sm">Run</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Loading Progress */}
                {isRunning && (
                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${loadingState.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Output Content */}
            <div className="flex-1 overflow-auto">
              {output ? (
                <div className={`p-4 font-mono text-sm ${error ? 'bg-red-50/50 dark:bg-red-900/10' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                  <pre className={`${outputConfig.wrap ? 'whitespace-pre-wrap' : 'whitespace-pre'} ${
                    error ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {Array.isArray(output) ? (
                      <table className="w-full">
                        <tbody>
                          {output.map(({line, content}) => (
                            <tr key={line} className="hover:bg-gray-100 dark:hover:bg-gray-800/50">
                              {outputConfig.showLineNumbers && (
                                <td className="select-none pr-4 text-gray-400 text-right">{line}</td>
                              )}
                              <td className="break-all">{content}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : output}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-8">
                  <FaTerminal className="w-8 h-8 mb-3 opacity-20" />
                  <p className="text-sm">Ready to execute your code</p>
                  <p className="text-xs mt-1 opacity-75">Press Ctrl + B or click Run</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex items-center justify-around">
            <button
              onClick={() => setMobileView('editor')}
              className={`p-3 rounded-lg flex flex-col items-center ${
                mobileView === 'editor' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <FaCode className="w-5 h-5" />
              <span className="text-xs mt-1">Editor</span>
            </button>
            
            <button
              onClick={handleSave}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex flex-col items-center"
            >
              <FaSave className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} />
              <span className="text-xs mt-1">{isSaving ? 'Saving' : 'Save'}</span>
            </button>
            
            <button
              onClick={runProject}
              disabled={isRunning}
              className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex flex-col items-center"
            >
              <FaPlay className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
              <span className="text-xs mt-1">{isRunning ? 'Running' : 'Run'}</span>
            </button>
            
            <button
              onClick={() => setMobileView('output')}
              className={`p-3 rounded-lg flex flex-col items-center ${
                mobileView === 'output' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <FaTerminal className="w-5 h-5" />
              <span className="text-xs mt-1">Output</span>
            </button>
          </div>
        )}

        {/* Keyboard Shortcuts - Hide on mobile */}
        {!isMobile && (
          <div className="fixed bottom-4 right-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 space-y-1">
              <p>Ctrl + S: Save</p>
              <p>Ctrl + B: Run</p>
              <p>Ctrl + F: Toggle Fullscreen</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Editor;
