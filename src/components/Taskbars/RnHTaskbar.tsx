import * as React from 'react';
import '../../Styles/RnHTaskbar.css'
import { Icon,IconButton } from '@fluentui/react';
import { useBoolean } from '@uifabric/react-hooks';
import { Stack,PrimaryButton,Panel,PanelType,Separator, IStackStyles,Label } from 'office-ui-fabric-react';
import { DefaultEffects } from '@fluentui/react';
import {Link } from 'react-router-dom';
export const RnHTaskbar: React.FunctionComponent = () => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
 const [width, setWidth] = React.useState(window.innerWidth);
  const[theClass,setTheClass]=React.useState("menu");
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    if(width<1300)
    setTheClass("");
    else
    setTheClass("menu")
    return () => window.removeEventListener("resize", updateWidth);
});
  return (
      <div >
          <Stack horizontal className="bar" >           
          <Icon iconName='list'  className="nav-icon" onClick={openPanel} />
          <Link to="/RecruitmentAndHiring" className="bar-link"  >Recruitment & Hiring </Link>
          </Stack>
       <Panel type={PanelType.customNear} customWidth="200px" isOpen={isOpen} onDismiss={dismissPanel} isLightDismiss  >
       <Stack >
       <Link to="/RequisitionForm"  className="nav-link" >
          <Stack>
          <Icon iconName='D365TalentLearn' className="nav-link-icon"  />
              <Label className="nav-link-text" > Job Requisition</Label>
           </Stack>
        </Link>
        <Separator />
       <Link to="/DescriptionForm" className="nav-link" >
          <Stack>
          <Icon iconName='PageHeaderEdit' className="nav-link-icon"  />
              <Label className="nav-link-text" >Job Description</Label>
           </Stack>
        </Link>
        <Separator />
        <Link to="/" className="nav-link" >
          <Stack>
          <Icon iconName='ClipboardList' className="nav-link-icon"  />
              <Label className="nav-link-text" >Job Board Posting</Label>
           </Stack>
        </Link>
        <Separator />
        <Link to="/" className="nav-link" >
          <Stack>
          <Icon iconName='BufferTimeBoth' className="nav-link-icon"  />
              <Label className="nav-link-text" >Applicant Tracking System</Label>
           </Stack>
        </Link>
        <Separator />
        <Link to="/" className="nav-link" >
          <Stack>
          <Icon iconName='Onboarding' className="nav-link-icon"  />
              <Label className="nav-link-text" >Candidate On-Boarding</Label>
           </Stack>
        </Link>
        </Stack>
      </Panel>
      </div>

  );
};
