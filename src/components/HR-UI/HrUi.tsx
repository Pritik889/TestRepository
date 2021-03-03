import * as React from 'react';
import '../../Styles/HrUi.css'
import {  useBoolean } from '@uifabric/react-hooks';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { DefaultEffects,IconButton,Icon } from '@fluentui/react';
import { TextField,Label ,Dropdown,Dialog ,Stack,PrimaryButton, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react';
const stackTokens = { childrenGap: 30};
const statusBoxProps = {
  title: 'Status!!',
};
export const HrUi: React.FunctionComponent = () => {
const [statusDialog, { toggle: toggleStatusDialog }] = useBoolean(true);
const [activeStep, setActiveStep] = React.useState(4);
const steps=['Interview Scheduled','Selected/Rejected','Offer Made','Joining Date'] 
const [theGetStatusById, setTheGetStatusById] = React.useState<any>({
  interviewScheduleDate: '',
  interviewScheduleBy: '',
  status: '',
  statusOn:'',
  offerMade:'',
  offerMadeOn:'',   
  isJoining:'',     
  joiningDate: ''
});

var users:any[];
users=[
    {
      id:1,
      name: "William Sharett",
      location: "Celebal Tech",
      position: "Sales Head",
      experience :  3,
      qualification :  "B.Tech",
      skills:["Microsoft Office","PowerBi"]
    },
    {
      id:2,
      name: "Chris Sharett",
      location: "Google",
      position: "Developer Lead",
      experience :  4,
      qualification :  "M.Tech",
      skills:["Nodejs","C#","SQL"]
    },
    {
      id:3,
      name: " Rose Sharett",
      location: "Microsoft",
      position: "Software Development Engineer",
      experience :  2,
      qualification :  "MBA",
      skills:["HTML","React","CSS"]
    },
    {
      id:4,
      name: "Mike Sharett",
      location: "Celebal",
      position: "Data Analyst",
      experience :  5,
      qualification :  "B.Tech",
      skills:["SQL","MongoDB"]
    }
  ];
  const options: IDropdownOption[] = [
    { key: 'frontEndHeader', text: 'FrontEnd', itemType: DropdownMenuItemType.Header },
    { key: 'angular', text: 'Angular' },
    { key: 'React', text: 'React' },
    { key: 'js', text: 'JavaScript' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'backend', text: 'Backend', itemType: DropdownMenuItemType.Header },
    { key: 'c#', text: 'C#' },
    { key: 'nodejs', text: 'NodeJs' },
  ];

  function showSkills(skills:any[]) {
     return skills.join(",")
  }
  async function statusBox(event: React.MouseEvent<HTMLElement>){
    var x=Number(event.currentTarget.getAttribute('value'));
      
    GetStatusById(x);
    toggleStatusDialog();
    
    
    }
    async function GetStatusById(x:number) {
      try{
       // Get By Id Status through api. Right now hardcoded for each user id for example.
       //Response as array of upto 4 . One for each  stage if completed
       let setstatus={
        interviewScheduleDate: '10-10-2020',
        interviewScheduleBy: '',
        status: 'Selected',
        statusOn:'4',
        offerMade:'yes',
        offerMadeOn:'10-10-2020',  
        isJoining:'no',      
        joiningDate: '20-10-2020'
        
    }
    setTheGetStatusById(setstatus)

      }
      catch(error){
        console.log(error)
      }
      
    }
  return (
<div>
  <br></br>
      <Stack horizontal tokens={stackTokens} style={{marginLeft:122}} >
        <TextField placeholder="Entry Id" />
        <TextField placeholder="Job Title" />
        <TextField placeholder="Minimum Experience" />        
        <Dropdown  style={{width:150}}  placeholder="Key Skills" multiSelect options={options}   />
        <PrimaryButton style={{borderRadius:50, boxShadow: DefaultEffects.elevation16 }}>Search</PrimaryButton>
      </Stack> 
      <div>      
        {users.map((user, index) => (
          <div key={index} className="card-item" >       

          <div className="cardbox">
          <div className="hr-command-bar">
          <IconButton className="command-bar-button" iconProps={{ iconName: 'SunQuestionMark' }} title="Check Status" onClick={statusBox} value={user.id} />
          <IconButton className="hr-command-bar-button" iconProps={{ iconName: 'Save' }} title="Save"  />
          <IconButton className="hr-command-bar-button" iconProps={{ iconName: 'UserPause' }} title="On Hold" />
          <IconButton className="hr-command-bar-button" iconProps={{ iconName: 'Cancel' }} title="Reject" />
          </div>    
    
    <div className="context">
    <p className="boldHead"><Icon iconName="Contact" style={{marginRight:15}} />{user.name}</p>
           <p  >Preff. Location:  {user.location} </p>
           <p  >Key Skills: {showSkills(user.skills)} </p>
          
          <p>Applied For: {user.position}</p>
          <p>Qualification: {user.qualification}</p>
          <p>Experience: {user.experience} </p>
    </div>
    </div>
    <Dialog
        hidden={statusDialog}
        onDismiss={toggleStatusDialog}
        dialogContentProps={statusBoxProps} containerClassName={ 'ms-dialogMainOverride '+'statusDialog'}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stack style={{marginLeft:30}} horizontal tokens={{childrenGap:40}}>
        <Stack>
          <Label>
            {theGetStatusById.interviewScheduleBy}
          </Label>
          <Label>
          On : {theGetStatusById.interviewScheduleDate}
          </Label>
         </Stack>
          {activeStep>1?
          <Stack>
          <Label>
            Result Date {theGetStatusById.statusOn}
          </Label>
          {(theGetStatusById.status==='Selected' || theGetStatusById.status==='selected')?<Label style={{color:"green"}}>Selected</Label>:<Label style={{color:"red"}}>{theGetStatusById.status}</Label>}
          
        </Stack>
          :null}
          {activeStep>2?
          <Stack>
          <Label>
            Offer Made : {theGetStatusById.offerMade}
          </Label>
          {(theGetStatusById.offerMade==='yes' || theGetStatusById.offerMade==='Yes')?<Label> On : {theGetStatusById.offerMadeOn}</Label>:<PrimaryButton >Send Reminder</PrimaryButton>}
          
        </Stack>
          :null}
          {activeStep>3?
          <Stack> 
             {(theGetStatusById.isJoining==='yes' || theGetStatusById.isJoining==='Yes')?<Label> Joining Date : {theGetStatusById.joiningDate}</Label>:<Label style={{color:"red"}}>Rejected</Label>}
          </Stack>
          :null}
          
        
      </Stack>
      </Dialog>    

   
          </div>
        ))}
      </div>
    </div>
  );
};
