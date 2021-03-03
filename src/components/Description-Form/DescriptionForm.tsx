import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack,PrimaryButton ,Label} from 'office-ui-fabric-react';
import '../../Styles/DescriptionForm.css'
import '../../Styles/quill.snow.css'
import ReactQuill from 'react-quill';
import { DetailsList,Selection, SelectionMode} from 'office-ui-fabric-react/lib/DetailsList';
import { initializeIcons } from '@uifabric/icons';
import { useForceUpdate } from '@uifabric/react-hooks';
import {Link } from 'react-router-dom';

initializeIcons();

const stackTokens = { childrenGap: 20};

export const DescriptionForm: React.FunctionComponent = () => {
 
  const[jobReqId,setJobReqId] =React.useState<string>();
  const[mandatorySkills,setMandatorySkills]=React.useState<string>();
  const[optionalSkills,setOptionalSkills]=React.useState<string>();
  const[jobDesDetails,setJobDesDetails]=React.useState('');
  const[locaton,setLocation]=React.useState<string>();
  const[exprience,setExprience]=React.useState<string>();
  const [update, setUpdate] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  var selec: Selection;
  const [del,setDel] = React.useState(-1);
  var tablecolumns: any[];
  var tablerows: any[];
  var cols:any[];
  cols =['jobDescriptionId','jobRequisitionId','mandatorySkills','optionalSkills','location','exprience']
  tablerows=[]
  const [rows, setRows] = React.useState<any[]>(tablerows);
  const [columns, setColumns] = React.useState<any[]>();
  const [showDescription, setShowDescription] = React.useState(false);  
  const [showDetailDescription, setShowDetailDescription] = React.useState(false);
  const [showP, setShowP] = React.useState(true);
  const forceUpdate = useForceUpdate();

  selec = new Selection({
    onSelectionChanged: () => {
     forceUpdate;
     var s= getSelectionDetails();
    setDel(s);     
    }
  });
  async function DetalDescription(){
    try {
      if(del!=-1)
      {
        var url='https://localhost:5001/api/JobDescription/'+del;
     const apiresponse = await fetch(url, {
            method: 'Get'
        });
        if (apiresponse.status !== 400) {
         
          apiresponse.json().then(function(result){ 
                setJobDesDetails(result["jobDescriptionDetails"])
                setShowDetailDescription(true);      
          })
        }
      } 
    } catch (error) {
      Add()
    }
   
  }
  tablecolumns=[
    {key:'column0',name:'Job Description Id',fieldName: 'jobDescriptionId', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column1',name:'Job Requisition Id',fieldName: 'jobRequisitionId', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column2',name:'Mandatory Skills',fieldName: 'mandatorySkills', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column4',name:'Optional Skills',fieldName: 'optionalSkills', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column5',name:'Location',fieldName: 'location', minWidth: 100, maxWidth: 100, isResizable: true},
    {key:'column6',name:'Exprience',fieldName: 'exprience', minWidth: 100, maxWidth: 160, isResizable: true},
   
]
 function getSelectionDetails(): any {
  const selecCount = selec.getSelectedCount();
  switch (selecCount) {
    case 0:
      return -1;
    default :
      return (selec.getSelection()[0] as any).jobDescriptionId; 
  }
}

async function Delete() {
  try {
    if(del!=-1)
    {
      var url='https://localhost:5001/api/JobDescription/'+del;
   const apiresponse = await fetch(url, {
          method: 'DELETE'
      });
      Search();
    }
  } catch (error) {
    console.log(error)
    Add()
  }
  
}
async function Update() {
  try {
    if(del!=-1)
  {
    var url='https://localhost:5001/api/JobDescription/'+del;
 const apiresponse = await fetch(url, {
        method: 'Get'       
    });
    if (apiresponse.status !== 400) {     
      apiresponse.json().then(function(result){
      var a:string
      a=result['location'];
            setJobReqId(result["jobRequisitionId"])
            setLocation(a)
            setExprience(result[ "exprience"])
            setMandatorySkills(result["mandatorySkills"])
            setOptionalSkills(result["optionalSkills"])
            setJobDesDetails(result["jobDescriptionDetails"])           
            setShowP(true);
            setShowDescription(false);
            setUpdate(true);
      })
    }
  } 
  } catch (error) {
    console.log(error)
    Add()
  } 
}
async function Put() {
  try {
    setShowDescription(false);
  setDisable(false);  
  var request ={
    "jobDescriptionId": del,
    "jobRequisitionId": Number(jobReqId),
    "mandatorySkills": mandatorySkills,
    "optionalSkills": optionalSkills,
    "jobDescriptionDetails": jobDesDetails,
    "location": locaton,
    "exprience": exprience   
}
  var url='https://localhost:5001/api/JobDescription/'+del;
  const apiresponse = await fetch(url, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(request)
  });
  setShowDescription(true);
  setShowP(false);
  Search();
  var newValue:string;
  newValue="";
  setJobReqId(newValue)
  setLocation(newValue)
  setExprience(newValue)
  setMandatorySkills(newValue)
  setOptionalSkills(newValue)
  setJobDesDetails(newValue)
  } catch (error) {
    console.log(error)
    Add()
  }
}
async function Add() {
 setShowP(true);
 setShowDescription(false);
 setUpdate(false);
 setJobDesDetails('');
 setJobReqId('');setExprience('');setOptionalSkills('');setMandatorySkills('');setLocation(''); 
}  
async function Search() {
    try {
      setShowP(false);
    const apiresponse = await fetch('https://localhost:5001/api/JobDescription', {
        method: 'GET'
    });
    if (apiresponse.status !== 400) {
    apiresponse.json().then(function(result) {
        let n=result.length;
        for(let i=0;i<n;i++)
        {
          var r: string;
           r='{ "key":"'+i+'",';
          for(let j=0;j<9;j++)
          {
            let a=cols[j];
            if(j!=0)
            r=r+",";
            r=r+'"'+a+'" : "'+result[i][a] +'"';
          }
          r=r+"}";
          var rp=JSON.parse(r);
          tablerows.push(rp);
        }
        setColumns(tablecolumns);
        setRows(tablerows);
        setShowDescription(true);
      });
    }
    } catch (error) {
      console.log(error)
      Add()
    }
}
async function Submit(){
  setDisable(true);
}  
async function Edit(){
setDisable(false);
} 
async function Post() {
      try {
        setShowDescription(false);
      setDisable(false);
      
      var request ={
       // "jobDescriptionId": del,
        "jobRequisitionId": Number(jobReqId),
        "mandatorySkills": mandatorySkills,
        "optionalSkills": optionalSkills,
        "jobDescriptionDetails": jobDesDetails,
        "location": locaton,
        "exprience": exprience,
        "createdByUserId": 1,
        "createdByUser": null,
        "endedByUserId": 1,
        "endedByUser": null,
        "modifiedByUserId": 1,
        "modifiedByUser": null
    }
      const apiresponse = await fetch('https://localhost:5001/api/JobDescription', {
          method: 'POST',
          headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(request)
      });
      setShowDescription(true);
      setShowP(false);
      Search();
      var newValue:string;
      newValue="";
      setJobReqId(newValue)
      setLocation(newValue)
      setExprience(newValue)
      setMandatorySkills(newValue)
      setOptionalSkills(newValue)
      setJobDesDetails(newValue)
      } catch (error) {
        console.log(error)
        Add()
      }
}
 const theJobReqId =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
   setJobReqId(newValue)
  };
  const theLocation =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
    setLocation(newValue);
  };
  const theExprience=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setExprience(newValue);
    };
    const theMandatorySkills=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setMandatorySkills(newValue);
    };
    const theOptionalSkills=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setOptionalSkills(newValue);
    };
  return (
  <Stack  >
    <Stack horizontal tokens={stackTokens} >
       <Label style={{marginLeft:50,marginTop:18,fontSize:20}}>Job Description</Label>
       <br></br>
       <PrimaryButton className="dbutton" style={{marginRight:25,width:200}} onClick={Search}>View All Description</PrimaryButton>
       <PrimaryButton className="dbutton" style={{width:160}} onClick={Add}>Add Description</PrimaryButton>
       <Link to="/RequisitionForm" >
            <PrimaryButton className="dbutton" style={{width:160}} >
               View Requisitions
            </PrimaryButton> 
       </Link>
    </Stack>  
    {showDescription?
    <Stack>
          <Stack horizontal tokens={stackTokens}>
           <PrimaryButton className="dbutton" onClick={Delete}>Delete</PrimaryButton>
           <PrimaryButton className="dbutton" onClick={Update}>Update</PrimaryButton>
           <PrimaryButton className="dbutton" style={{width:220}} onClick={DetalDescription}>View Detailed Description</PrimaryButton>
          </Stack>
          <DetailsList
            items={rows}
            columns={columns}
            setKey="none"
            selection={selec}
            selectionMode={SelectionMode.single}
            selectionPreservedOnEmptyClick={false}
          />
           {showDetailDescription?<section
                className="not-found-controller"
                dangerouslySetInnerHTML={{ __html: jobDesDetails}}
            />:null}
    </Stack>:null}
    {showP?  <div> <br></br> <br></br>
      <Stack horizontal tokens={{childrenGap:100}}>
    <div className="dbox" >
    <Stack horizontal>
      <div className="dmain-container">     
      <TextField label="Job Requisition Id" disabled={disable} onChange={theJobReqId} value={jobReqId} className="ditem" placeholder="Enter..."  />
      <TextField label="Mandatory Skills" disabled={disable} onChange={theMandatorySkills} value={mandatorySkills} className="ditem" placeholder="Enter..."  />
      <TextField label="Optional Skills" disabled={disable} onChange={theOptionalSkills} value={optionalSkills} className="ditem" placeholder="Enter..."  />
      <TextField label="Location" disabled={disable} onChange={theLocation} value={locaton} className="ditem" placeholder="Enter..."  />
      <TextField label="Exprience" disabled={disable} onChange={theExprience} value={exprience} className="ditem" placeholder="Enter..."  />
      <br></br><br></br>
      </div>  
      <div className="dmain-container">
        <Label style={{marginTop:33}}>Detailed Job Description</Label>
      <ReactQuill style={{width:500,height:303,marginBottom:40}}readOnly={disable}  theme="snow" value={jobDesDetails} onChange={setJobDesDetails}/>
      {disable?
    <Stack horizontal tokens={{childrenGap:50}} style={{marginLeft:220}}>
      {update?<PrimaryButton  className="dbutton" onClick={Put}>UPDATE</PrimaryButton>:<PrimaryButton  className="dbutton" onClick={Post}>ADD</PrimaryButton>}
      <PrimaryButton  className="dbutton" onClick={Edit}>EDIT</PrimaryButton>
    </Stack> :<PrimaryButton style={{marginLeft:350}}  className="dbutton" onClick={Submit}>SUBMIT</PrimaryButton>}
       </div>
      </Stack>
      <br></br> 
   </div>
   </Stack>
   <br></br>
  </div>:null}
  </Stack>
  );
};
