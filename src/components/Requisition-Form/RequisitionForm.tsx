import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, PrimaryButton, DatePicker, IDatePickerStrings, Label, FontIcon, Icon } from 'office-ui-fabric-react';
import '../../Styles/RequisitionForm.css'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Doughnut, Line } from 'react-chartjs-2';
import { IconButton, DefaultEffects } from '@fluentui/react'
import { useBoolean } from '@uifabric/react-hooks';
import { initializeIcons } from '@uifabric/icons';
import { Dialog, DialogFooter, Dropdown, IDropdownOption, Nav, INavLinkGroup, INavLink } from 'office-ui-fabric-react';
import { RnHTaskbar } from '../../components/Taskbars/RnHTaskbar'
import { baseUrl, reqGraph, deleteJr, addJr, updateJr, getJr, getJrById, getStatus } from '../../config'

initializeIcons();

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [

      {
        name: 'Add Requisitions',
        url: '',
        key: 'key2',
        isExpanded: true,
        target: '_blank',
        icon: 'Add',
      },
      {
        name: 'Your Added Requisitions',
        url: '',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
        icon: 'CheckMark',
      },
      {
        name: 'Pending Descriptions',
        url: '',
        key: 'key4',
        target: '_blank',
        icon: 'OpenEnrollment',
      },
      {
        name: 'Drafts',
        url: '',
        key: 'key5',
        disabled: true,
        icon: 'PageEdit',
      },
      {
        name: 'Shortlisted Candidates',
        url: '',
        key: 'key6',
        target: '_blank',
        icon: 'Group',
      },

    ],
  },
];
const confirmDeleteProps = {
  title: 'Confirm Delete!!',
  subText: 'Are you sure you would like yo Delete the Record?',
};
const infoBoxProps = {
  title: 'Details!!',
};
const statusBoxProps = {
  title: 'Status!!',
};
const stackTokens = { childrenGap: 20 };
const modelProps = {
  isBlocking: false,
  styles: { main: { width: 900, height: 500 } },
};
const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};

export const RequisitionForm: React.FunctionComponent = () => {
  const today: Date = new Date(Date.now())
  const [activeStep, setActiveStep] = React.useState(0);
  const [jobSkillsIdVal, setJobSkillsIdVal] = React.useState<number[]>([]);
  const [jobSkills, setJobSkills] = React.useState<string[]>([]);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [statusDialog, { toggle: toggleStatusDialog }] = useBoolean(true);
  const [infoDialog, { toggle: toggleInfoDialog }] = useBoolean(true);
  const [hiringDeptIdVal, setHiringDeptIdVal] = React.useState<number | null>(null);
  const [hiringManagerIdVal, setHiringManagerIdVal] = React.useState<number | null>(null);
  const [startSalRangeVal, setStartSalRangeVal] = React.useState<string>();
  const [endSalRangeVal, setEndSalRangeVal] = React.useState<string>();
  const [hourlyRateVal, setHourlyRateVal] = React.useState<string>();
  const [payGradeVal, setPaygradeVal] = React.useState<string>();
  
  const [assignedUserVal, setAssignedUserVal] = React.useState<number | null>(null);
  const [preffStartDateVal, setPreffStartDateVal] = React.useState<Date | null | undefined>();
  const [update, setUpdate] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [posTitleVal, setPosTitleVal] = React.useState<number | null>(null);
  const [show, setShow] = React.useState(true);
  const [showP, setShowP] = React.useState(false);
  const [hasRendered, setHasRendered] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const [graphs, setGraphs] = React.useState(false)
  const [stateLine, setStateLine] = React.useState({})
  const [stateSelected, setStateSelected] = React.useState({})
  const steps = ['JR Created', 'JD Filled', 'Send to HR', 'JR Posted']

  const typeOptions: IDropdownOption[] = [

    { key: 'intern', text: 'Intern' },
    { key: 'associate', text: 'Associate' },
    { key: 'developer', text: 'Developer' },
    { key: 'seniordeveloper', text: 'Senior Developer' },
    { key: 'teamlead', text: 'Team Lead' },
  ];

  const payGradeOptions: IDropdownOption[] = [

    { key: '1', text: 'Grade-1' },
    { key: '2', text: 'Grade-2' },
    { key: '3', text: 'Grade-3' },
    { key: '4', text: 'Grade-4' },
  ];

  var notHidden: boolean;
  notHidden = false;
  var tablerows: any[];
  var renderVariable: any[];
  var cols: any[];
  cols = ['jobRequisitionId', 'jobRequisitionDescription', 'hiringManagerId', 'hiringDepartmentId', 'statusId', 'dateCreated', 'assignedUser', 'hourlyRate', 'payGrade', 'positionTitle', 'prefferedStartDate', 'startSalaryRange', 'endSalaryRange']
  tablerows = [];
  renderVariable = [];
  const [rows, setRows] = React.useState<any[]>(tablerows);
  const [theSkills, setTheSkills] = React.useState<IDropdownOption[]>([{ key: '', text: '' }]);
  const [thePositions, setThePositions] = React.useState<IDropdownOption[]>([{ key: '', text: '' }]);
  const [theDepartments, setTheDepartments] = React.useState<IDropdownOption[]>([{ key: '', text: '' }]);
  const [theManagers, setTheManagers] = React.useState<IDropdownOption[]>([{ key: '', text: '' }]);
  const [theUsers, setTheUsers] = React.useState<IDropdownOption[]>([{ key: '', text: '' }]);
  //payGradeOptions
  const [theGetById, setTheGetById] = React.useState<any>({
    jobRequisitionId: '',
    assignedUserUserId: '',
    statusId: '',
    statusDescription: '',
    jobRequisitionsStatusActive: '',
    assignedUserUserName: '',
    positionId: '',
    positionName: '',
    jobSkillId: '',
    jobSkillsTitle: '',
    departmentId: '',
    departmentName: '',
    hiringManagerId: '',
    hiringManagerName: '',
    prefferedStartDate: '',
    startSalaryRange: '',
    endSalaryRange: '',
    hourlyRate: '',
    payGrade: '',
    datePrefferedStart: ''
  });
  const [theGetStatusById, setTheGetStatusById] = React.useState<any>({
    jrBy: '',
    jrOn: '',
    jdBy: '',
    jdOn: '',
    toHr: '',
    toHrOn: '',
    postedOn: '',
    postedBy: ''
  });
  const [width, setWidth] = React.useState(window.innerWidth);
  const [isHorizontal, setIsHorizontal] = React.useState(true);

  const [skillsUpdated, setSkillsUpdated] = React.useState(false);
  const renderProps = [
    {
      renderUrl: baseUrl + '/api/GetSkills',
      renderFunctionName: setTheSkills,
      renderKey: 'jobSkillId',
      renderFirstText: 'jobSkillTitle',
      renderSecondText: ''
    },
    {
      renderUrl: baseUrl + '/api/GetPosition',
      renderFunctionName: setThePositions,
      renderKey: 'positionId',
      renderFirstText: 'positionName',
      renderSecondText: ''
    },
    {
      renderUrl: baseUrl + '/api/GetDepartments',
      renderFunctionName: setTheDepartments,
      renderKey: 'departmentId',
      renderFirstText: 'departmentName',
      renderSecondText: ''
    },
    {
      renderUrl: baseUrl + '/api/GetUsers',
      renderFunctionName: setTheUsers,
      renderKey: 'userId',
      renderFirstText: 'firstName',
      renderSecondText: 'lastName'
    },
    {
      renderUrl: baseUrl + '/api/GetHiringManager',
      renderFunctionName: setTheManagers,
      renderKey: 'userId',
      renderFirstText: 'firstName',
      renderSecondText: 'lastName'
    }
  ]
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    if (width < 700)
      setIsHorizontal(false);
    else
      setIsHorizontal(true)
    return () => window.removeEventListener("resize", updateWidth);
  });
  graphs ? null : RenderGraph();
  async function RenderGraph() {
    setGraphs(true);
    var url = baseUrl + reqGraph;
    const apiresponse = await fetch(url, {
      method: 'GET'
    });
    if (apiresponse.status !== 400) {
      apiresponse.json().then(function (result) {
        var labs = [], jrData = [], jdData = [], selectedData = []

        var n = result.length
        for (let i = 0; i < n; i++) {
          labs.push(result[i]["department"]);
          jrData.push(result[i]["pendingJr"]);
          jdData.push(result[i]["pendingJd"]);
          selectedData.push(result[i]["selected"]);
        }
        var line = {
          labels: labs,
          datasets: [
            {
              label: 'Job Description',
              fill: false,
              backgroundColor: '#241571',
              borderColor: '#241571',
              pointRadius: 2,
              borderWidth: 2,
              data: jdData
            },
            {
              label: 'JR',
              fill: false,
              backgroundColor: '#52B2BF',
              borderColor: '#52B2BF',
              borderWidth: 2,
              pointRadius: 2,
              data: jrData
            }
          ]
        }
        var selstate = {
          labels: labs,
          datasets: [
            {
              label: 'Selected',
              backgroundColor: [
                '#016064',
                '#2832C2',
                '#241571',
                '#52B2BF'
              ],
              hoverBackgroundColor: [
                '#C0C0C0',
                '#C0C0C0',
                '#C0C0C0',
                '#C0C0C0'
              ],
              data: selectedData
            }
          ]
        }
        setStateLine(line);
        setStateSelected(selstate);
        setGraphs(true);
      });
    }
  }
  function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    if (item && item.name === 'Add Requisitions') {
      Add();
    }
    else if (item && item.name === 'Your Added Requisitions') {
      Search();
    }

  }
  async function infoBox(event: React.MouseEvent<HTMLElement>) {

    var x = Number(event.currentTarget.getAttribute('value'));

    GetById(x);
    toggleInfoDialog();


  }
  async function statusBox(event: React.MouseEvent<HTMLElement>) {
    var x = Number(event.currentTarget.getAttribute('value'));

    GetStatusById(x);
    toggleStatusDialog();


  }
  async function Delete(event: React.MouseEvent<HTMLElement>) {
    var x: number;
    x = Number(event.currentTarget.getAttribute('value'));
    if (x != -1) {
      try {
        var url = baseUrl + deleteJr + x;
        const apiresponse = await fetch(url, {
          method: 'DELETE'
        });
        toggleHideDialog();
        Search();
      }
      catch (error) {
        Add()
      }
    }

  }
  async function GetById(x: number) {
    try {

      if (x != -1) {
        var url = baseUrl + getJrById + x;
        const apiresponse = await fetch(url, {
          method: 'Get'
        });
        if (apiresponse.status !== 400) {
          apiresponse.json().then(function (result) {
            var skillid: number[]; var sid: any[];
            skillid = []

            sid = result["jobSkillsId"].split(',')
            for (let i = 0; i < sid.length; i++) {
              skillid.push(Number(sid[i]))
            }
            sid = result["jobSkills"].split(',')
            var x = {
              jobRequisitionId: result["jobRequisitionId"],
              assignedUserUserId: result["assignedUserUserId"],
              statusId: result["statusId"],
              //statusDescription:result["statusEntity"]["statusDescription"],
              // jobRequisitionsStatusActive: result["statusEntity"]["jobRequisitionsStatusActive"],
              assignedUserUserName: result["assignedUser"]["firstName"] + ' ' + result["assignedUser"]["lastName"],
              positionId: result["positionId"],
              positionName: result["jobPositionEntity"]["positionName"],
              jobSkillId: result["jobSkillsId"].split(','),
              jobSkillsTitle: result["jobSkills"],
              departmentId: result["departmentId"],
              departmentName: result["departmentEntity"]["departmentName"],
              hiringManagerId: result["hiringManagerId"],
              hiringManagerName: result["hiringManager"] ? result["hiringManager"]["firstName"] + ' ' + result["hiringManager"]["lastName"] : null,
              prefferedStartDate: result["prefferedStartDate"],
              startSalaryRange: result["startSalaryRange"],
              endSalaryRange: result["endSalaryRange"],
              hourlyRate: result["hourlyRate"],
              payGrade: result["payGrade"],
              datePrefferedStart: result["datePrefferedStart"]
            }
            setTheGetById(x);
            setJobSkillsIdVal(skillid)
            setJobSkills(sid)
            setPosTitleVal(result["positionId"])
            setHiringDeptIdVal(result["departmentId"])
            setHiringManagerIdVal(result["hiringManagerId"])
            setPreffStartDateVal(result["prefferedStartDate"])
            setStartSalRangeVal(result["startSalaryRange"])
            setEndSalRangeVal(result["endSalaryRange"])
            setHourlyRateVal(result["hourlyRate"])
            setPaygradeVal(result["payGrade"])
            setAssignedUserVal(result["assignedUserUserId"])
          })
        }
      }
    }
    catch (error) {
      console.log(error)
      Add()
    }

  }
  async function GetStatusById(x: number) {
    try {

      if (x != -1) {
        var url = baseUrl + getStatus + x;
        const apiresponse = await fetch(url, {
          method: 'Get'
        });
        if (apiresponse.status !== 400) {
          apiresponse.json().then(function (result) {
            let status = result.length;
            let setstatus = {
              jrBy: '',
              jrOn: '',
              jdBy: '',
              jdOn: '',
              toHr: '',
              toHrOn: '',
              postedOn: '',
              postedBy: ''
            }
            switch (status) {
              case 4: setActiveStep(4); setstatus.postedBy = ''; setstatus.postedOn = ''//after posted
              case 3: setActiveStep(3); setstatus.toHr = ''; setstatus.toHrOn = ''//hr details
              case 2: setActiveStep(2); setstatus.jdBy = ''; setstatus.jdOn = ''//jd details
              case 1: setActiveStep(1); setstatus.jrBy = result[0]["CreatedBy"]; setstatus.jrOn = result[0]["CreatedDate"];//jr details

            }
            setTheGetStatusById(setstatus);
          }
          )
        }
      }
    }
    catch (error) {
      console.log(error)
      Add()
    }

  }
  async function RenderFields() {

    for (let j = 0; j < renderProps.length; j++) {
      try {

        const apiresponse = await fetch(renderProps[j].renderUrl, {
          method: 'GET'
        });
        if (apiresponse.status !== 400) {
          apiresponse.json().then(function (result) {
            let n = result.length;
            renderVariable = [];
            for (let i = 0; i < n; i++) {
              let y;
              y = renderProps[j].renderSecondText == '' ? '' : result[i][renderProps[j].renderSecondText];

              var x = {
                key: result[i][renderProps[j].renderKey],
                text: result[i][renderProps[j].renderFirstText] + ' ' + y
              }
              renderVariable.push(x);

            }

            renderProps[j].renderFunctionName(renderVariable);

          });
        }
      } catch (error) {
        console.log(error);
        nAdd()
      }
    }

    setHasRendered(true);
  }
  async function doPut(event: React.MouseEvent<HTMLElement>) {

    setDisable(false);
    setShowP(true);
    setUpdate(true);
    setSkillsUpdated(false);
    var x: number;
    x = Number(event.currentTarget.getAttribute('value'))
    GetById(x);

  }
  async function Put(event: React.MouseEvent<HTMLElement>) {
    try {
      var x: number;
      x = Number(event.currentTarget.getAttribute('value'))

      var request = {
        "jobRequisitionId": x,
        "assignedUserUserId": assignedUserVal,
        "positionId": posTitleVal,
        "departmentId": hiringDeptIdVal,
        "hiringManagerId": hiringManagerIdVal,
        "jobSkillsId": jobSkillsIdVal.join(","),
        "jobSkills": skillsUpdated ? jobSkills.join(",") : theGetById.jobSkillsTitle,
        "prefferedStartDate": preffStartDateVal ? preffStartDateVal : today,
        "startSalaryRange": Number(startSalRangeVal),
        "endSalaryRange": Number(endSalRangeVal),
        "hourlyRate": Number(hourlyRateVal),
        "payGrade": Number(payGradeVal)
      }
      var url = baseUrl + updateJr + x;
      const apiresponse = await fetch(url, {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(request)
      });

      setShow(true);
      setShowP(false);
      Search();
      var newValue: string;
      newValue = "";
      setEndSalRangeVal(newValue); setStartSalRangeVal(newValue);
        setHourlyRateVal(newValue); setPaygradeVal(newValue); setPosTitleVal(null); setHiringDeptIdVal(null); setHiringManagerIdVal(null); setJobSkillsIdVal([]); setAssignedUserVal(null);

    } catch (error) {
      console.log(error);
      Add()
    }


  }
  hasRendered ? null : RenderFields();
  async function Add() {
    var newValue: string;
    newValue = "";
    setEndSalRangeVal(newValue); setStartSalRangeVal(newValue);
    setDisable(false)
    var newS: string[];
    newS = [];
    setJobSkills(newS);
      setHourlyRateVal(newValue); setPaygradeVal(newValue); setPosTitleVal(null); setHiringDeptIdVal(null); setHiringManagerIdVal(null); setJobSkillsIdVal([]); setAssignedUserVal(null);
    setShowP(true);

    setUpdate(false);
  }
  async function nAdd() {
    setShowP(false);
    setShow(true);
    setUpdate(false);
  }
  hasLoaded ? null : Search();
  async function Search() {
    try {
      setShowP(false); setShow(false); setHasLoaded(true);
      var url = baseUrl + getJr;
      const apiresponse = await fetch(url, {
        method: 'GET'
      });
      if (apiresponse.status !== 400) {
        apiresponse.json().then(function (result) {
          let n = result.length;
          for (let i = 0; i < n; i++) {

            var x = {
              jobRequisitionId: result[i]["jobRequisitionId"],
              assignedUserUserId: result[i]["assignedUserUserId"],
              statusId: result[i]["statusId"],
              //statusDescription:result[i]["statusEntity"]["statusDescription"],
              // jobRequisitionsStatusActive: result[i]["statusEntity"]["jobRequisitionsStatusActive"],
              assignedUserUserName: result[i]["assignedUser"]["firstName"] + ' ' + result[i]["assignedUser"]["lastName"],
              positionId: result[i]["positionId"],
              positionName: result[i]["jobPositionEntity"]["positionName"],
              jobSkillId: result[i]["jobSkillsId"].split(','),
              jobSkillsTitle: result[i]["jobSkills"].split(','),
              departmentId: result[i]["departmentId"],
              departmentName: result[i]["departmentEntity"]["departmentName"],
              hiringManagerId: result[i]["hiringManagerId"],
              hiringManagerName: result[i]["hiringManager"] ? result[i]["hiringManager"]["firstName"] + ' ' + result[i]["hiringManager"]["lastName"] : null,
              prefferedStartDate: result[i]["prefferedStartDate"],
              startSalaryRange: result[i]["startSalaryRange"],
              endSalaryRange: result[i]["endSalaryRange"],
              hourlyRate: result[i]["hourlyRate"],
              payGrade: result[i]["payGrade"],
              datePrefferedStart: result[i]["datePrefferedStart"]
            }
            tablerows.push(x);
          }
          setRows(tablerows);
          setShow(true);
        });
      }
    } catch (error) {
      console.log(error);
      nAdd()
    }
  }
  async function Submit() {
    setDisable(true);
  }
  async function Edit() {
    setDisable(false);
  }
  async function Post() {
    try {
      setShow(false);
      setDisable(false);

      var request = {
        "assignedUserUserId": assignedUserVal,
        "statusId": 1,
        "positionId": posTitleVal,
        "departmentId": hiringDeptIdVal,
        "hiringManagerId": hiringManagerIdVal ? hiringManagerIdVal : 1,
        "jobSkillsId": jobSkillsIdVal.join(","),
        "jobSkills": jobSkills.join(","),
        "prefferedStartDate": preffStartDateVal ? preffStartDateVal : today,
        "startSalaryRange": Number(startSalRangeVal),
        "endSalaryRange": Number(endSalRangeVal),
        "hourlyRate": Number(hourlyRateVal),
        "payGrade": Number(payGradeVal),
        "createdByUserId": 1,
        "modifiedByUserId": 1
      }

      console.log('MMMMM------', JSON.stringify(request))
      var url = baseUrl + addJr;
      const apiresponse = await fetch(url, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(request)
      });
      if (apiresponse.status !== 400) {
        apiresponse.json().then(function (result) {
        })
      }
      setShow(true);
      setShowP(false);
      Search();

    } catch (error) {
      console.log(error);
      Add()
    }
  }

  async function SaveAsDraft() {
    try {
      setShow(false);
      setDisable(false);

      var request = {
        "assignedUserUserId": assignedUserVal,
        "statusId": 5,
        "positionId": posTitleVal,
        "departmentId": hiringDeptIdVal,
        "hiringManagerId": hiringManagerIdVal ? hiringManagerIdVal : 1,
        "jobSkillsId": jobSkillsIdVal.join(","),
        "jobSkills": jobSkills.join(","),
        "prefferedStartDate": preffStartDateVal ? preffStartDateVal : today,
        "startSalaryRange": Number(startSalRangeVal),
        "endSalaryRange": Number(endSalRangeVal),
        "hourlyRate": Number(hourlyRateVal),
        "payGrade": Number(payGradeVal),
        "createdByUserId": 1,
        "modifiedByUserId": 1
      }
      var url = baseUrl + addJr;
      const apiresponse = await fetch(url, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(request)
      });
      if (apiresponse.status !== 400) {
        apiresponse.json().then(function (result) {
        })
      }
      setShow(true);
      setShowP(false);
      Search();

    } catch (error) {
      console.log(error);
      Add()
    }
  }
  const posTitle = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => {
    item ? setPosTitleVal(Number(item.key)) : null
  };
  const hiringDeptId = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => {
    item ? setHiringDeptIdVal(Number(item.key)) : null
  };
  const hiringManagerId = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => {
    item ? setHiringManagerIdVal(Number(item.key)) : null
  };
  const jobSkillsId = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => {
    setSkillsUpdated(true)
    if (item) {
      setJobSkillsIdVal(
        item.selected ? [...jobSkillsIdVal, Number(item.key)] : jobSkillsIdVal.filter(key => key !== item.key),
      );
      setJobSkills(
        item.selected ? [...jobSkills, item.text] : jobSkills.filter(text => text !== item.text),
      );
    }
    setJobSkills([]);
    if (item) {
      setJobSkills(
        item.selected ? [...jobSkills, item.text] : jobSkills.filter(text => text !== item.text),
      );
    }


  };
  const startSalRange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setStartSalRangeVal(newValue);
  };
  const endSalRange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setEndSalRangeVal(newValue);
  };
  const hourlyRate = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setHourlyRateVal(newValue);
  };
   const payGrade = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
     setPaygradeVal(newValue);
   };
   const assignedUser = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => {
    item ? setAssignedUserVal(Number(item.key)) : null
  };
  const preffStartDate = (date: Date | null | undefined) => {
    setPreffStartDateVal(date);
  };
  return (
    <div style={{ marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, boxShadow: DefaultEffects.elevation8 }} >
      <Stack>
        <RnHTaskbar />
        <Stack className="main-stack" tokens={{ childrenGap: 40 }}>
          <Stack tokens={{ childrenGap: 40 }} className="col1" >
            <Label style={{ marginLeft: 25, marginTop: 18, fontSize: 25 }}>Job Requisition</Label>
            <Nav groups={navLinkGroups} onLinkClick={_onLinkClick} />
          </Stack>
          <Stack className="col2">
            <Stack horizontal={isHorizontal} tokens={{ childrenGap: 20 }} className="filter" style={{ marginTop: 8 }}>

              <Icon iconName="filterSolid" style={{ fontSize: 28 }} />
              <Dropdown style={{ width: 150 }} placeholder="Job Type" multiSelect options={typeOptions} />
              <Dropdown style={{ width: 150 }} placeholder="Key Skills" multiSelect options={theSkills} />
              <DatePicker
                minDate={today}
                style={{ width: 150 }}
                strings={DayPickerStrings}
                placeholder="Preff. Start Date"
              />
            </Stack>
            <br></br><br></br>
            {show ?
              <div className="main-card">
                {rows.map((req, index) => (
                  <div key={index} className="cardItem" >

                    <div className="card">
                      <div className="command-bar">
                        <IconButton className="command-bar-button" iconProps={{ iconName: 'EditSolid12' }} title="Update" onClick={doPut} value={req.jobRequisitionId} />
                        <IconButton className="command-bar-button" iconProps={{ iconName: 'Delete' }} title="Delete" onClick={toggleHideDialog} value={req.jobRequisitionId} />
                        <IconButton className="command-bar-button" iconProps={{ iconName: 'SunQuestionMark' }} title="Check Status" onClick={statusBox} value={req.jobRequisitionId} />
                        <IconButton className="command-bar-button" iconProps={{ iconName: 'InfoSolid' }} title="Info" onClick={infoBox} value={req.jobRequisitionId} />
                      </div>
                      <div className="cardHead">

                        <div className="icondiv">
                          <FontIcon iconName="Teamwork" className="iconclass" /></div>
                        <p className="boldTxt">Position : {req.jobSkillsTitle} {req.positionName}</p>
                      </div>
                      <div className="mainText">
                        <p style={{ wordWrap: "normal" }} >Preff. Start Date:  {req.datePrefferedStart} </p>

                        <p>JD Assigned To - {req.assignedUserUserName}</p>
                        <p>Job Requisition Status : In Progress </p>
                      </div>

                      <Dialog
                        hidden={statusDialog}
                        onDismiss={toggleStatusDialog}
                        dialogContentProps={statusBoxProps} containerClassName={'ms-dialogMainOverride ' + 'statusDialog'}
                      >
                        <Stepper activeStep={activeStep} alternativeLabel>
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                        <Stack style={{ marginLeft: 30 }} horizontal tokens={{ childrenGap: 40 }}>
                          <Stack>
                            <Label>
                              On : {theGetStatusById.jrOn}
                            </Label>
                            <Label>
                              By : {theGetStatusById.jrBy}
                            </Label>
                          </Stack>
                          {activeStep > 1 ?
                            <Stack>
                              <Label>
                                On : {theGetStatusById.jdOn}
                              </Label>
                              <Label>
                                By : {theGetStatusById.jdBy}
                              </Label>
                            </Stack>
                            : null}
                          {activeStep > 2 ?
                            <Stack>
                              <Label>
                                On : {theGetStatusById.toHr}
                              </Label>
                              <Label>
                                By : {theGetStatusById.toHrOn}
                              </Label>
                            </Stack>
                            : null}
                          {activeStep > 3 ?
                            <Stack>
                              <Label>
                                On : {theGetStatusById.postedOn}
                              </Label>
                              <Label>
                                By : {theGetStatusById.postedBy}
                              </Label>
                            </Stack>
                            : null}
                          {activeStep < 4 ?
                            <Stack>
                              <Label style={{ marginLeft: 40, marginBottom: 10 }}>
                                Not Yet...
          </Label>
                              <PrimaryButton >Send Reminder</PrimaryButton>
                            </Stack>
                            : null}

                        </Stack>
                      </Dialog>


                      <Dialog
                        hidden={infoDialog}
                        onDismiss={toggleInfoDialog}
                        dialogContentProps={infoBoxProps} containerClassName={'ms-dialogMainOverride ' + 'infoDialog'}
                      >

                        <div className="detail-container">
                          <h4 className="detailItem">Skill</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {theGetById.jobSkillsTitle}
                          </h4>
                          <h4 className="detailItem">Position Title</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {theGetById.positionName}
                          </h4>
                        </div>
                        <div className="detail-container">
                          <h4 className="detailItem">Hiring Department</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {theGetById.departmentName}
                          </h4>
                          <h4 className="detailItem">Hiring Manager</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {theGetById.hiringManagerName}
                          </h4>
                        </div>
                        <div className="detail-container">
                          <h4 className="detailItem">Start Salary Range</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {startSalRangeVal}
                          </h4>
                          <h4 className="detailItem">End Salary Range</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {endSalRangeVal}
                          </h4>
                        </div>
                        <div className="detail-container">
                          <h4 className="detailItem">JD Assigned To</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {theGetById.assignedUserUserName}
                          </h4>
                          <h4 className="detailItem">Preffered Start Date</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {theGetById.datePrefferedStart}
                          </h4>
                        </div>
                        <div className="detail-container">
                          <h4 className="detailItem">Hourly Rate</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {hourlyRateVal}
                          </h4>
                          <h4 className="detailItem">Pay Grade</h4>
                          <h4 className="detailItem" style={{ marginLeft: 20, fontWeight: "normal" }}>
                            {payGradeVal}
                          </h4>
                        </div>
                      </Dialog>
                      <Dialog
                        hidden={hideDialog}
                        onDismiss={toggleHideDialog}
                        dialogContentProps={confirmDeleteProps}
                      >

                        <DialogFooter>
                          <PrimaryButton onClick={Delete} value={req.jobRequisitionId} text="Delete" />
                          <PrimaryButton onClick={toggleHideDialog} text="Cancel" />
                        </DialogFooter>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
              : null}

            {showP ?
              <Dialog hidden={notHidden} modalProps={modelProps} containerClassName={'ms-dialogMainOverride ' + 'textDialog'} onDismiss={nAdd}>
                <Stack horizontal>{update ? <Label>Update Requisition</Label> : <Label>Add Requisition</Label>}<IconButton onClick={nAdd} style={{ position: "absolute", right: 5 }} iconProps={{ iconName: 'ChromeClose' }} /></Stack>
                <Stack horizontal={isHorizontal} tokens={{ childrenGap: 120 }} style={{ maxWidth: 650 }} >
                  <Stack tokens={stackTokens} style={{ width: 200, marginLeft: 50 }} >


                    <Dropdown label="Skill Set" disabled={disable} multiSelect selectedKeys={jobSkillsIdVal} options={theSkills} onChange={jobSkillsId} className="item" placeholder="Multi Select" />
                    <Dropdown label="Position Title" disabled={disable} selectedKey={posTitleVal} options={thePositions} onChange={posTitle} className="item" placeholder="Select from Dropdown" />
                    <Dropdown label="Hiring Department" disabled={disable} selectedKey={hiringDeptIdVal} options={theDepartments} onChange={hiringDeptId} className="item" placeholder="Select from Dropdown" />
                    <Dropdown label="Hiring Manager" disabled={disable} selectedKey={hiringManagerIdVal} options={theManagers} onChange={hiringManagerId} className="item" placeholder="Select from Dropdown" />
                    {/* <label className="lablestyle">Hourly Rate</label>
                    <div className="divwithDdlAndTextBox">
                      <select className="currencyDropdown" placeholder="Select from Dropdown">
                        <option value="val1">$</option>
                        <option value="val2">₹</option>
                      </select>
                      <TextField disabled={disable} className="smallTextboxSize" onChange={hourlyRate} value={hourlyRateVal} placeholder="e.g. 45" />
                    </div> */}

                    <TextField label="Hourly Rate" disabled={disable} className="item" onChange={hourlyRate} value={hourlyRateVal} placeholder="e.g. 45" />

                  </Stack>
                  <Stack tokens={stackTokens} style={{ width: 200, marginLeft: 50 }}>

                    <TextField label="Start Salary Range" disabled={disable} onChange={startSalRange} value={startSalRangeVal} placeholder="e.g. 12,000" />
                    <TextField label="End Salary Range" disabled={disable} onChange={endSalRange} value={endSalRangeVal} placeholder="e.g. 15,000" />
                    <TextField label="Pay Grade" disabled={disable} onChange={payGrade} value={payGradeVal} placeholder="Select From Dropdown" /> 
                    <Dropdown label="Assign Job Description" selectedKey={assignedUserVal} disabled={disable} options={theUsers} onChange={assignedUser} placeholder="Select a Team Member" />
                    <DatePicker
                      className="item"
                      onSelectDate={preffStartDate}
                      minDate={today}
                      label="Preferred Start Date  "
                      strings={DayPickerStrings}
                      placeholder="Select the Date..."
                      ariaLabel="Select a date"
                      disabled={disable}
                    />
                  </Stack>
                </Stack>
                <DialogFooter>
                  {disable ?
                    <Stack className="item" horizontal={isHorizontal} tokens={{ childrenGap: 20 }} style={{ marginRight: 10 }} >
                      {update ? <PrimaryButton style={{ left: 50 }} value={theGetById.jobRequisitionId} onClick={Put}>Update</PrimaryButton> : <PrimaryButton style={{ left: 50 }} onClick={Post}>Add</PrimaryButton>}
                      <PrimaryButton style={{ left: 50 }} onClick={Edit} >Edit</PrimaryButton>
                    </Stack> :
                    <Stack className="item" horizontal={isHorizontal} tokens={{ childrenGap: 20 }}>
                      <PrimaryButton style={{ left: 50, minWidth: 130 }} onClick={SaveAsDraft}  > Save as Draft</PrimaryButton>
                      <PrimaryButton style={{ left: 50 }} onClick={Submit}>Submit</PrimaryButton>
                    </Stack>
                  }
                </DialogFooter>
              </Dialog> : null

            }
          </Stack>
          <Stack className="col3" />
          <Stack className="col4" >


            <Doughnut
              data={stateSelected}
              options={{
                title: {
                  display: true,
                  text: 'Selected',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'left'
                }
              }}
            />
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="graphline">
              <Line
                data={stateLine}
                options={{
                  title: {
                    display: true,
                    text: 'Completed',
                    fontSize: 20

                  },
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,

                      }
                    }]
                  },
                  legend: {
                    display: true,
                    position: 'top'
                  }
                }}
              />
            </div>

          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};
