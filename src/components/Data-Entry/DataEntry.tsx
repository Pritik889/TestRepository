import React from 'react';
import './DataEntry.css';
import { initializeIcons } from 'office-ui-fabric-react/lib';
import { TextField} from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps,PrimaryButton, IStackStyles } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from '@fluentui/react/lib/Icon';
import { Document, Page,pdfjs } from 'react-pdf';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 230 },
};

const options: IDropdownOption[] = [
  { key: 'skillsHeader', text: 'Technology', itemType: DropdownMenuItemType.Header },
  { key: 'angular', text: 'Angular' },
  { key: 'react js', text: 'React js' },
  { key: 'node js', text: 'Node js' },
  { key: 'html', text: 'HTML' },
  { key: '.net', text: '.Net' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'TechHeader', text: 'specialization', itemType: DropdownMenuItemType.Header },
  { key: 'javascript', text: 'JavaScript' },
  { key: 'python', text: 'Python' },
  { key: 'c#', text: 'C#' },
];
const iconClass = mergeStyles({
    fontSize: 10,
    height: 10,
    width: 10,
    margin: '0 10px',
  });
   
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
   
  const stackTokens = { childrenGap: 120 };
  const iconProps = { iconName: 'Calendar' };
  const iconProps1 = { iconName: 'BusinessCenterLogo' };
  const iconProps2 = { iconName: 'AccountManagement' };
  const iconProps3 = { iconName: 'AddPhone' };
  const iconProps4 = { iconName: 'Mail' };
  const iconProps5 = { iconName: 'Work' };
  const iconProps6 = { iconName: 'Repair' };
  const iconProps7 = { iconName: 'Education' };
  const iconProps8 = { iconName: 'Commitments' };
  const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 20 },
    styles: { root: { width: 230 } },
  };
   
  initializeIcons();

  export const DataEntry: React.FunctionComponent = () => {
    const[ufile,setUfile] =React.useState<File | null>()
    const[isFile,setIsFile]=React.useState(false)
    const [numPages, setNumPages] = React.useState(0); 
  const [pageNumber, setPageNumber] = React.useState(1); 
    const onFileChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
     event.target.files instanceof FileList? setUfile(event.target.files[0]):null;
     event.target.files instanceof FileList? setIsFile(true):null;
    };
    function Open (){

      function onDocumentLoadSuccess(pdf :any) { 
        setNumPages(pdf.numPages); 
        setPageNumber(1); 
      } 
      
      function changePage(offset :number) { 
        setPageNumber(prevPageNumber => prevPageNumber + offset); 
      } 
      
      function previousPage() { 
        changePage(-1); 
      } 
      
      function nextPage() { 
        changePage(1); 
      }
      return(<> 
        <div className="main"> 
          <Document 
            file={ufile} 
            onLoadSuccess={onDocumentLoadSuccess} 
          > 
            <Page pageNumber={pageNumber} /> 
          </Document> 
          <div> 
            <div className="pagec"> 
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} 
            </div> 
            <div className="buttonc"> 
            <button 
              type="button"
              disabled={pageNumber <= 1} 
              onClick={previousPage} 
              className="Pre"
                
            > 
              Previous 
            </button> 
            <button 
              type="button"
              disabled={pageNumber >= numPages} 
              onClick={nextPage} 
               
            > 
              Next 
            </button> 
            </div> 
          </div> 
          </div> 
        </>)
    }
    return (
      <form>
      <div className="diver">
      <Stack horizontal tokens={stackTokens} styles={stackStyles} className="stuck">
      <Stack {...columnProps}>
        <TextField label="Job Title" iconProps={iconProps1} placeholder="Enter job title" required/>
        <TextField label="Last Name" iconProps={iconProps2} placeholder="Last Name" required/>
        <TextField label="Contact Number" iconProps={iconProps3} placeholder="Contact Number" required/>
        <TextField label="Working Experience" iconProps={iconProps5} placeholder="1-2 yrs" required/>
        <TextField label="Current Employer" iconProps={iconProps8} placeholder="Ex-Google" required/>
       
        <input type="submit" value="Submit" className="btn"/>
      </Stack>
      <Stack {...columnProps}>
        <TextField label="First Name" iconProps={iconProps2} placeholder="First Name" required/>
        <TextField label="E-mail ID" iconProps={iconProps4} placeholder="E-Mail" required/>
        <Dropdown
          placeholder="Choose your skills"
          label="Skills"
          defaultSelectedKeys={['angular', 'react js', 'node js']}
          multiSelect
          options={options}
          styles={dropdownStyles}
        />
        <TextField label="Qualifications" iconProps={iconProps7} placeholder="Enter Qualification" required/> 
        <div className='button-wrap'>
        <Label  htmlFor="upload"> 
        <Stack horizontal>
        <Icon  iconName= 'upload' className="new-button" style={{fontSize:30, marginTop:10,marginLeft:30}}  /> {isFile?<div style={{marginLeft:20,marginTop:20}}> {ufile?ufile.name:null}</div>:<div style={{marginLeft:20,marginTop:20}}>Attach Resume</div>}
        </Stack></Label>
        
        <input id='upload' type='file' onChange={onFileChange} accept="application/pdf" ></input>
        </div>
      </Stack>
    </Stack></div></form>
    );
  };