import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Outlet } from "react-router-dom";
// import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import AppContainer from "../Appcontainer";
import store from "../../store";
import { Provider } from "react-redux";
import Login from "../../views/pages/Authentication/Login";
import SetPassword from "../../views/pages/Authentication/SetPassword";
import Otp from "../../views/pages/Authentication/Otp";
import Error404 from "../../views/pages/Error/Error404";
import Error500 from "../../views/pages/Error/Error500";
import JobList from "../../views/pages/Authentication/JobList";
import JobView from "../../views/pages/Authentication/JobView";
import ChangePassword from "../../views/pages/Authentication/ChangePassword";
import ForgotPassword from "../../views/pages/Authentication/ForgotPassword";
import LockScreen from "../../views/pages/Authentication/LockScreen";
import Accordions from "../../views/pages/Ui_Interface/Components/Accordions";
import Alerts from "../../views/pages/Ui_Interface/Components/Alerts";
import Breadcrumbs from "../../views/pages/Ui_Interface/Components/Breadcrumbs";
import Avatar from "../../views/pages/Ui_Interface/Components/Avatar";
import Badges from "../../views/pages/Ui_Interface/Components/Badges";
import ButtonCard from "../../views/pages/Ui_Interface/Components/ButtonCard";
import ButtonGroup from "../../views/pages/Ui_Interface/Components/ButtonGroup";
import Cards from "../../views/pages/Ui_Interface/Components/Cards";
import Dropdowns from "../../views/pages/Ui_Interface/Components/Dropdowns";
import Grid from "../../views/pages/Ui_Interface/Components/Grid";
import Images from "../../views/pages/Ui_Interface/Components/Images";
import Media from "../../views/pages/Ui_Interface/Components/Media";
import Modals from "../../views/pages/Ui_Interface/Components/Modals";
import Offcanvas from "../../views/pages/Ui_Interface/Components/Offcanvas";
import Pagination from "../../views/pages/Ui_Interface/Components/Pagination";
import Popover from "../../views/pages/Ui_Interface/Components/Popover";
import Progress from "../../views/pages/Ui_Interface/Components/Progress";
import Placeholder from "../../views/pages/Ui_Interface/Components/Placeholder";
import RangeSlider from "../../views/pages/Ui_Interface/Components/RangeSlider";
import Spinners from "../../views/pages/Ui_Interface/Components/Spinners";
import SweetAlert from "../../views/pages/Ui_Interface/Components/SweetAlert";
import Tabs from "../../views/pages/Ui_Interface/Components/Tabs";
import Toats from "../../views/pages/Ui_Interface/Components/Toats";
// import Tooltip from "../../views/pages/Ui_Interface/Components/Tooltip";
import Typography from "../../views/pages/Ui_Interface/Components/Typography";
import Videos from "../../views/pages/Ui_Interface/Components/Videos";
import Lightbox from "../../views/pages/Ui_Interface/Components/Lightbox";
import Carousel from "../../views/pages/Ui_Interface/Components/Carousel";
import { Navigate } from "react-router-dom/dist";
import Borders from "../../views/pages/Ui_Interface/Components/Borders";
import Breadcrumb from "../../views/pages/Ui_Interface/Components/Breadcrumb";
import Colors from "../../views/pages/Ui_Interface/Components/colors";
import UiModals from "../../views/pages/Ui_Interface/Components/uimodals";
import Spinner from "../../views/pages/Ui_Interface/Components/Spinner";
import Tooltips from "../../views/pages/Ui_Interface/Components/Tooltip";
import ComingSoon from "../../views/pages/Pages/ComingSoon";
import UnderManitenance from "../../views/pages/Pages/UnderManitenance";
import EmployeeDashboard from "../../views/pages/MainPages/Dashboard/EmployeeDashboard";



// new imports from appContainer
import Header from "../../views/layout/Header";
import Sidebar from "../../views/layout/Sidebar";
import ChatSidebar from "../../components/Mainpages/chatSidebar";
import ComponentSidebar from "../../components/ComponentSidebar";
import EmailSidebar from "../../components/Mainpages/emailSidebar";
import SettingsSidebar from "../../components/SettingsSidebar";

import BasicInputs from "../../views/pages/Ui_Interface/Forms/BasicInputs";
import InputGroups from "../../views/pages/Ui_Interface/Forms/InputGroups";
import HorizontalForm from "../../views/pages/Ui_Interface/Forms/HorizontalForm";
import VerticalForm from "../../views/pages/Ui_Interface/Forms/VerticalForm";
import Formmask from "../../views/pages/Ui_Interface/Forms/Formmask";
import Formvalidation from "../../views/pages/Ui_Interface/Forms/Formvalidation";
import TablesBasic from "../../views/pages/Ui_Interface/Tables/TablesBasic";
import DataTables from "../../views/pages/Ui_Interface/Tables/DataTables";
import PerformanceIndicator from "../../views/pages/Performance/Performance/PerformanceIndicator";
import PerformanceReview from "../../views/pages/Performance/Performance/PerformanceReview";
import PerformanceAppraisal from "../../views/pages/Performance/Performance/PerformanceAppraisal";
import GoalTracking from "../../views/pages/Performance/Goals/GoalTracking";
import GoalType from "../../views/pages/Performance/Goals/GoalType";
import Trainers from "../../views/pages/Performance/Training/Trainers";
import Training from "../../views/pages/Performance/Training/Training";
import TrainingType from "../../views/pages/Performance/Training/TrainingType";
import AdminDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/adminDashboard";
import Chat from "../../views/pages/MainPages/Apps/chat";
import VoiceCall from "../../views/pages/MainPages/Apps/calls/voiceCall";
import VideoCall from "../../views/pages/MainPages/Apps/calls/VideoCall";
import Outgoing from "../../views/pages/MainPages/Apps/calls/outgoingCall";
import IncomingCall from "../../views/pages/MainPages/Apps/calls/incomingCall";
import Calendar from "../../views/pages/MainPages/Apps/calendar";
import Contacts from "../../views/pages/MainPages/Apps/contacts";
import Email from "../../views/pages/MainPages/Apps/Email";
import FileManager from "../../views/pages/MainPages/Apps/FileManager";
import Compose from "../../views/pages/MainPages/Apps/Email/compose";
import Estimates from "../../views/pages/HR/Sales/Estimates";
import CreateEstimate from "../../views/pages/HR/Sales/Estimates/createEstimate";
import EditEstimate from "../../views/pages/HR/Sales/Estimates/EditEstimate";
import Invoices from "../../views/pages/HR/Sales/Invoices/Index";
import CreateInvoice from "../../views/pages/HR/Sales/Invoices/createInvoice";
import EditInvoice from "../../views/pages/HR/Sales/Invoices/editInvoice";
import InvoiceView from "../../views/pages/HR/Sales/Invoices/invoiceView";
import Payments from "../../views/pages/HR/Sales/payments";
import Promotion from "../../views/pages/Performance/Promotion";
import Resignation from "../../views/pages/Performance/Resignation";
import Termination from "../../views/pages/Performance/Termination";
import Components from "../../views/pages/Ui_Interface/Components/Components";
import Settings from "../../views/pages/Administration/Settings/Settings";
import Localization from "../../views/pages/Administration/Settings/Localization";
import ThemeSettings from "../../views/pages/Administration/Settings/ThemeSettings";
import RolesPermissions from "../../views/pages/Administration/Settings/RolesPermissions";
import EmailSettings from "../../views/pages/Administration/Settings/EmailSettings";
import PerformanceSetting from "../../views/pages/Administration/Settings/Performance/PerformanceSetting";
import ApprovalSetting from "../../views/pages/Administration/Settings/ApprovalSetting";
import InvoiceSettings from "../../views/pages/Administration/Settings/InvoiceSettings";
import SalarySettings from "../../views/pages/Administration/Settings/SalarySettings";
import NotificationSettings from "../../views/pages/Administration/Settings/NotificationSettings";
import LeaveType from "../../views/pages/Administration/Settings/LeaveType";
import ToxboxSetting from "../../views/pages/Administration/Settings/ToxboxSetting";
import CronSetting from "../../views/pages/Administration/Settings/CronSetting";
import AllEmpoyee from "../../views/pages/Employees/AllEmpoyee";
import Holidays from "../../views/pages/Employees/Holidays";
import AdminLeave from "../../views/pages/Employees/AdminLeave";
import EmployeeLeave from "../../views/pages/Employees/EmployeeLeave";
import LeaveSettings from "../../views/pages/Employees/LeaveSetting";
import AttendenceAdmin from "../../views/pages/Employees/Attendenceadmin";
import AttendanceEmployee from "../../views/pages/Employees/AttendenceEmployee";
import Department from "../../views/pages/Employees/Department";
import Designation from "../../views/pages/Employees/Designation";
import TimeSheet from "../../views/pages/Employees/TimeSheet";
import ShiftScheduling from "../../views/pages/Employees/ShiftandSchedule";
import ShiftList from "../../views/pages/Employees/ShiftList";
import OverTime from "../../views/pages/Employees/OverTime";
import Clients from "../../views/pages/Employees/Clients";
import Project from "../../views/pages/Employees/Projects/Project";
import ClientList from "../../views/pages/Employees/ClientList";
import Tasks from "../../views/pages/Employees/Projects/Tasks";
import { SidebarProject } from "../../views/pages/Employees/Projects/SidebarProject";
import TaskBoard from "../../views/pages/Employees/Projects/TaskBoard";
import Leads from "../../views/pages/Employees/Leads";
import Ticket from "../../views/pages/Employees/Ticket";
import ClientProfile from "../../views/pages/Profile/ClientProfile";
import Profile from "../../views/pages/Profile/Profile";
import Subscribtions from "../../views/pages/Subscribtions/Subscribtions";
import SubscribedCompany from "../../views/pages/Subscribtions/SubscribedCompany";
import SubscribtionsCompany from "../../views/pages/Subscribtions/SubscribtionsCompany";
import Search from "../../views/pages/Pages/Search/Search";
import Faq from "../../views/pages/Pages/Faq";
import Terms from "../../views/pages/Pages/Terms";
import PrivacyPolicy from "../../views/pages/Pages/PrivacyPolicy";
import BlankPage from "../../views/pages/Pages/BlankPage";
import KnowledgeBase from "../../views/pages/Administration/Knowledgebase/KnowledgeBase";
import KnowledgeBaseView from "../../views/pages/Administration/Knowledgebase/KnowledgeBaseView";
import EmployeeList from "../../views/pages/Employees/EmployeeList";
import Expenses from "../../views/pages/HR/Sales/Expenses";
import Activities from "../../views/pages/Administration/Activities";
import ProvidentFund from "../../views/pages/HR/Sales/ProvidentFund";
import Taxes from "../../views/pages/HR/Sales/Taxes";
import Categories from "../../views/pages/HR/Accounting/Categories";
import SubCategory from "../../views/pages/HR/Accounting/Categories/subCategory";
import Budgets from "../../views/pages/HR/Accounting/Budgets.jsx";
import BudgetExpenses from "../../views/pages/HR/Accounting/BudgetExpenses";
import BudgetRevenues from "../../views/pages/HR/Accounting/BudgetRevenue";
import EmployeeSalary from "../../views/pages/HR/Payroll/EmployeeSalary.jsx";
import PaySlip from "../../views/pages/HR/Payroll/Payslip";
import PayrollItems from "../../views/pages/HR/Payroll/PayrollItems.jsx";
import Policies from "../../views/pages/HR/Policies";
import ExpenseReport from "../../views/pages/HR/Reports/ExpenseReport";
import InvoiceReport from "../../views/pages/HR/Reports/InvoiceReport";
import PaymentReport from "../../views/pages/HR/Reports/PaymentReport";
import ProjectReport from "../../views/pages/HR/Reports/ProjectReport";
import TaskReport from "../../views/pages/HR/Reports/TaskReport";
import UserReport from "../../views/pages/HR/Reports/UserReport";
import EmployeeReport from "../../views/pages/HR/Reports/EmployeeReports";
import PaySlipReports from "../../views/pages/HR/Reports/PaySlipReports";
import AttendanceReport from "../../views/pages/HR/Reports/AttendanceReport";
import LeaveReport from "../../views/pages/HR/Reports/LeaveReport";
import DailyReports from "../../views/pages/HR/Reports/DailyReports";
import Assets from "../../views/pages/Administration/Assets";
import UserDashboard from "../../views/pages/Administration/Jobs/UserJob/UserDashboard";
import UserAllJobs from "../../views/pages/Administration/Jobs/UserJob/UserAllJobs";
import SavedJobs from "../../views/pages/Administration/Jobs/UserJob/SavedJobs";
import AppliedJobs from "../../views/pages/Administration/Jobs/UserJob/AppliedJobs";
import Interviewing from "../../views/pages/Administration/Jobs/UserJob/Interviewing";
import JobAptitude from "../../views/pages/Administration/Jobs/UserJob/JobAptitude";
import Questions from "../../views/pages/Administration/Jobs/UserJob/Questions";
import UserOfferedJobs from "../../views/pages/Administration/Jobs/UserJob/UserOfferedJobs";
import VisitedJobs from "../../views/pages/Administration/Jobs/UserJob/VisitedJobs";
import ArchivedJobs from "../../views/pages/Administration/Jobs/UserJob/ArchivedJobs";
import JobsDashboard from "../../views/pages/Administration/Jobs/JobDashboard";
import ManageJobs from "../../views/pages/Administration/Jobs/ManageJobs";
import ManageJobResumes from "../../views/pages/Administration/Jobs/ManageResumes";
import ShortListCandidates from "../../views/pages/Administration/Jobs/ShortListCandidates";
import InterviewingQuestions from "../../views/pages/Administration/Jobs/InterviewingQuestions";
import OfferApprovals from "../../views/pages/Administration/Jobs/OfferApprovals";
import ExperienceLevel from "../../views/pages/Administration/Jobs/ExperienceLevel";
import CanditatesList from "../../views/pages/Administration/Jobs/CanditatesList";
import ScheduleTiming from "../../views/pages/Administration/Jobs/ScheduleTiming.jsx";
import AptitudeResults from "../../views/pages/Administration/Jobs/AptitudeResults";
import Users from "../../views/pages/Administration/Users";
import ProjectList from "../../views/pages/Employees/Projects/ProjectList";
import ProjectView from "../../views/pages/Employees/Projects/ProjectView";
import OffCanvas from "../../components/OffCanvas";
import FormSelectTwo from "../../views/pages/Ui_Interface/Forms/FormSelectTwo.jsx";
import FileUpload from "../../views/pages/Ui_Interface/Forms/FileUpload.jsx";
// import ExcelFileUpload from "../../views/pages/Ui_Interface/Forms/ExcelFileUpload.jsx";
import TravelExpenseTable from "../../views/pages/Ui_Interface/Forms/TravelExpenseTable.jsx"
import ExcelFileUpload from "../../views/pages/Ui_Interface/Forms/ExcelFileUpload.jsx";
import ExcelInfoFileUpload from "../../views/pages/Ui_Interface/Forms/ExcelInfoFileUpload.jsx";
import HodTravelExpenseShow from "../../views/pages/Ui_Interface/Forms/HodTravelExpenseShow.jsx"
import Ribbon from "../../views/pages/Ui_Interface/Elements/Ribbon.jsx";
import Clipboard from "../../views/pages/Ui_Interface/Elements/Clipboard.jsx";
import Dragdrop from "../../views/pages/Ui_Interface/Elements/Dragdrop.jsx";
import Ratings from "../../views/pages/Ui_Interface/Elements/Rating.jsx";
import Texteditor from "../../views/pages/Ui_Interface/Elements/Texteditor.jsx";
import Counter from "../../views/pages/Ui_Interface/Elements/Counter.jsx";
import Scrollbar from "../../views/pages/Ui_Interface/Elements/Scrollbar.jsx";
import Notification from "../../views/pages/Ui_Interface/Elements/Notification.jsx";
import Stickynotes from "../../views/pages/Ui_Interface/Elements/Stickynote.jsx";
import Timeline from "../../views/pages/Ui_Interface/Elements/Timeline.jsx";
import Formwizard from "../../views/pages/Ui_Interface/Elements/Formwizard.jsx";
import Apexchart from "../../views/pages/Ui_Interface/Charts/Apexcharts.jsx";
import ChartJs from "../../views/pages/Ui_Interface/Charts/Chartjs.jsx";
import MorrisCharts from "../../views/pages/Ui_Interface/Charts/Morrischarts.jsx";
import FlotCharts from "../../views/pages/Ui_Interface/Charts/Flotcharts.jsx";
import PeityCharts from "../../views/pages/Ui_Interface/Charts/Peitycharts.jsx";
import C3Charts from "../../views/pages/Ui_Interface/Charts/C3charts.jsx";
import FontAwesomeicons from "../../views/pages/Ui_Interface/Icons/Fontawesomeicons.jsx";
import FeatherIcons from "../../views/pages/Ui_Interface/Icons/Feathericons.jsx";
import IonicIcon from "../../views/pages/Ui_Interface/Icons/Ionicicons.jsx";
import MaterialIcons from "../../views/pages/Ui_Interface/Icons/Materialicons.jsx";
import Pe7Icon from "../../views/pages/Ui_Interface/Icons/Pe7icons.jsx";
import SimpleLine from "../../views/pages/Ui_Interface/Icons/Simpleicons.jsx";
import Themifyicons from "../../views/pages/Ui_Interface/Icons/Themifyicons.jsx";
import WeatherIcons from "../../views/pages/Ui_Interface/Icons/Weathericons.jsx";
import Typicons from "../../views/pages/Ui_Interface/Icons/Typicons.jsx";
import FlagIcons from "../../views/pages/Ui_Interface/Icons/Flagicons.jsx";
import ContactList from "../../views/pages/Crm/ContactList.jsx";
import ContactGrid from "../../views/pages/Crm/ContactGrid.jsx";
import DealsDashboard from "../../views/pages/MainPages/Dashboard/DealsDashboard/index.jsx";
import LeadsDashboard from "../../views/pages/MainPages/Dashboard/LeadsDashboard/index.jsx";
import TicketDetails from "../../views/pages/Employees/TicketDetails.jsx";
import Companies from "../../views/pages/Crm/companies.jsx";
import ContactDetails from "../../views/pages/Crm/ContactDetails.jsx";
import LeadsList from "../../views/pages/Crm/LeadsList.jsx";
import LeadsKanban from "../../views/pages/Crm/LeadsKanban.jsx";
import LeadsDetails from "../../views/pages/Crm/LeadsDetails.jsx";
import PipeLine from "../../views/pages/Crm/PipeLine.jsx";
import CompaniesGrid from "../../views/pages/Crm/CompaniesGrid.jsx";
import CompanyDetails from "../../views/pages/Crm/CompanyDetails.jsx";
import Deals from "../../views/pages/Crm/Deals.jsx";
import DealsKanban from "../../views/pages/Crm/DealsKanban.jsx";
import Analytics from "../../views/pages/Crm/Analytics.jsx";
import RecentFiles from "../../views/pages/MainPages/Apps/FileManager/recentFiles.jsx";
import EmailContent from "../../views/pages/MainPages/Apps/Email/emailContent.jsx";
import EmailView from "../../views/pages/MainPages/Apps/Email/emailView.jsx";
import DealsDetails from "../../views/pages/Crm/DealsDetails.jsx";
import AllEmployee from "../../views/pages/Employees/AllEmpoyee";


// copied functions
const SidebarLayout = () => (
  <>
    <Header name="Test"/>
    <Sidebar />
    <OffCanvas />
    <Outlet />
  </>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRouter = () => {
  useEffect(() => {
    localStorage.setItem("email", "admin@dreamstechnologies.com");
    localStorage.setItem("password", "123456");
  }, []);

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter basename="">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> */}
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/error-404" element={<Error404 />} />
            <Route path="/error-500" element={<Error500 />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/under-maintenance" element={<UnderManitenance />} />

            {/* adding sidbar and other things */}
            <Route element={<SidebarLayout />}>
              <Route path="/job-list" element={<JobList />} />
              <Route path="/job-view" element={<JobView />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/lock-screen" element={<LockScreen />} />
              <Route path="/accordion" element={<Accordions />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/breadcrumbs" element={<Breadcrumbs />} />
              <Route path="/avatar" element={<Avatar />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/buttons" element={<ButtonCard />} />
              <Route path="/buttongroup" element={<ButtonGroup />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/dropdowns" element={<Dropdowns />} />
              <Route path="/grid" element={<Grid />} />
              <Route path="/images" element={<Images />} />
              <Route path="/media" element={<Media />} />
              <Route path="/modal" element={<Modals />} />
              <Route path="/offcanvas" element={<Offcanvas />} />
              <Route path="/pagination" element={<Pagination />} />
              <Route path="/popover" element={<Popover />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/placeholders" element={<Placeholder />} />
              <Route path="/rangeslider" element={<RangeSlider />} />
              <Route path="/spinners" element={<Spinners />} />
              <Route path="/sweetalert" element={<SweetAlert />} />
              <Route path="/nav-tabs" element={<Tabs />} />
              <Route path="/toastr" element={<Toats />} />
              <Route path="/tooltips" element={<Tooltips />} />
              <Route path="/typography" element={<Typography />} />
              <Route path="/video" element={<Videos />} />
              <Route path="/lightbox" element={<Lightbox />} />
              <Route path="/carousel" element={<Carousel />} />
              <Route path="/carousel" element={<Carousel />} />
              <Route path="/borders" element={<Borders />} />
              <Route path="/breadcrumb" element={<Breadcrumb />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/modals" element={<UiModals />} />
              <Route path="/spinner" element={<Spinner />} />

              {/* new urls copied from appContainer */}
              <Route path="/form-basic-inputs" element={<BasicInputs/>} />
              <Route path="/admin-dashboard" element={<AdminDashboard/>} />
              <Route path="/form-horizontal" element={<HorizontalForm/>} />
              <Route path="/form-vertical" element={<VerticalForm/>} />
              <Route path="/form-mask" element={<Formmask/>} />
              <Route path="/form-validation" element={<Formvalidation/>} />
              <Route path="/tables-basic" element={<TablesBasic/>} />
              <Route path="/data-tables" element={<DataTables/>} />
              <Route path="/performance-indicator" element={<PerformanceIndicator/>} />
              <Route path="/performance" element={<PerformanceReview/>} />
              <Route path="/performance-appraisal" element={<PerformanceAppraisal/>} />
              <Route path="/goal-tracking" element={<GoalTracking/>} />
              <Route path="/goal-type" element={<GoalType/>} />
              <Route path="/trainers" element={<Trainers/>} />
              <Route path="/training" element={<Training/>} />
              <Route path="/training-type" element={<TrainingType/>} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />
              <Route path="/activities" element={<Activities/>} />
              <Route path="/form-input-groups" element={<InputGroups/>} />
              <Route path="/events" element={<Calendar/>} />
              <Route path="/contacts" element={<Contacts/>} />
              <Route path="/file-manager" element={<FileManager/>} />
              <Route path="/estimates" element={<Estimates/>} />
              <Route path="/create-estimate" element={<CreateEstimate/>} />
              <Route path="/edit-estimate" element={<EditEstimate/>} />
              <Route path="/invoices" element={<Invoices/>} />
              <Route path="/create-invoice" element={<CreateInvoice/>} />
              <Route path="/edit-invoice" element={<EditInvoice/>} />
              <Route path="/invoice-view" element={<InvoiceView/>} />
              <Route path="/payments" element={<Payments/>} />
              <Route path="/promotion" element={<Promotion/>} />
              <Route path="/resignation" element={<Resignation/>} />
              <Route path="/termination" element={<Termination/>} />
              <Route path="/employees" element={<AllEmployee/>} />
              <Route path="/holidays" element={<Holidays/>} />
              <Route path="/adminleaves" element={<AdminLeave/>} />
              <Route path="/leaves-employee" element={<EmployeeLeave/>} />
              <Route path="/leave-settings" element={<LeaveSettings/>} />
              <Route path="/adminattendance" element={<AttendenceAdmin/>} />
              <Route path="/attendance-employee" element={<AttendanceEmployee/>} />
              <Route path="/departments" element={<Department/>} />
              <Route path="/designations" element={<Designation/>} />
              <Route path="/timesheet" element={<TimeSheet/>} />
              <Route path="/shift-scheduling" element={<ShiftScheduling/>} />
              <Route path="/shift-list" element={<ShiftList/>} />
              <Route path="/overtime" element={<OverTime/>} />
              <Route path="/clients" element={<Clients/>} />
              <Route path="/projects" element={<Project/>} />
              <Route path="/clients-list" element={<ClientList/>} />
              <Route path="/task-board" element={<TaskBoard/>} />
              <Route path="/leads" element={<Leads/>} />
              <Route path="/tickets" element={<Ticket/>} />
              <Route path="/client-profile" element={<ClientProfile/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/subscriptions" element={<Subscribtions/>} />
              <Route path="/subscribed-companies" element={<SubscribedCompany/>} />
              <Route path="/subscriptions-company" element={<SubscribtionsCompany/>} />
              <Route path="/search" element={<Search/>} />
              <Route path="/faq" element={<Faq/>} />
              <Route path="/terms" element={<Terms/>} />
              <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
              <Route path="/blank-page" element={<BlankPage/>} />
              <Route path="/knowledgebase" element={<KnowledgeBase/>} />
              <Route path="/knowledgebase-view" element={<KnowledgeBaseView/>} />
              <Route path="/employees-list" element={<EmployeeList/>} />
              <Route path="/expenses" element={<Expenses/>} />
              <Route path="/provident-fund" element={<ProvidentFund/>} />
              <Route path="/taxes" element={<Taxes/>} />
              <Route path="/categories" element={<Categories/>} />
              <Route path="/sub-category" element={<SubCategory/>} />
              <Route path="/budgets" element={<Budgets/>} />
              <Route path="/budget-expenses" element={<BudgetExpenses/>} />
              <Route path="/budget-revenues" element={<BudgetRevenues/>} />
              <Route path="/salary-view" element={<PaySlip/>} />
              <Route path="/payroll-items" element={<PayrollItems/>} />
              <Route path="/policies" element={<Policies/>} />
              <Route path="/salary" element={<EmployeeSalary/>} />
              <Route path="/expense-reports" element={<ExpenseReport/>} />
              <Route path="/invoice-reports" element={<InvoiceReport/>} />
              <Route path="/payments-reports" element={<PaymentReport/>} />
              <Route path="/project-reports" element={<ProjectReport/>} />
              <Route path="/task-reports" element={<TaskReport/>} />
              <Route path="/user-reports" element={<UserReport/>} />
              <Route path="/employee-reports" element={<EmployeeReport/>} />
              <Route path="/payslip-reports" element={<PaySlipReports/>} />
              <Route path="/attendance-reports" element={<AttendanceReport/>} />
              <Route path="/leave-reports" element={<LeaveReport/>} />
              <Route path="/daily-reports" element={<DailyReports/>} />
              <Route path="/project-list" element={<ProjectList/>} />
              <Route path="/project-view" element={<ProjectView/>} />
              <Route path="/form-select2" element={<FormSelectTwo/>} />
              <Route path="/file-upload" element={<FileUpload/>} />
              <Route path="/ribbon" element={<Ribbon/>} />
              <Route path="/clipboard" element={<Clipboard/>} />
              <Route path="/dragdrop" element={<Dragdrop/>} />
              <Route path="/rating" element={<Ratings/>} />
              <Route path="/text-editor" element={<Texteditor/>} />
              <Route path="/counter" element={<Counter/>} />
              <Route path="/scrollbar" element={<Scrollbar/>} />
              <Route path="/notification" element={<Notification/>} />
              <Route path="/stickynote" element={<Stickynotes/>} />
              <Route path="/timeline" element={<Timeline/>} />
              <Route path="/form-wizard" element={<Formwizard/>} />
              <Route path="/apex-charts" element={<Apexchart/>} />
              <Route path="/chartjs" element={<ChartJs/>} />
              <Route path="/morris-charts" element={<MorrisCharts/>} />
              <Route path="/flot-charts" element={<FlotCharts/>} />
              <Route path="/peity-charts" element={<PeityCharts/>} />
              <Route path="/charts-c3" element={<C3Charts/>} />
              <Route path="/fontawesome-icons" element={<FontAwesomeicons/>} />
              <Route path="/feather-icons" element={<FeatherIcons/>} />
              <Route path="/ionic-icons" element={<IonicIcon/>} />
              <Route path="/material-icons" element={<MaterialIcons/>} />
              <Route path="/pe7-icons" element={<Pe7Icon/>} />
              <Route path="/simpleline-icons" element={<SimpleLine/>} />
              <Route path="/themify-icons" element={<Themifyicons/>} />
              <Route path="/weather-icons" element={<WeatherIcons/>} />
              <Route path="/typicons" element={<Typicons/>} />
              <Route path="/flag-icons" element={<FlagIcons/>} />
              <Route path="/contact-list" element={<ContactList/>} />
              <Route path="/contact-grid" element={<ContactGrid/>} />
              <Route path="/deals-dashboard" element={<DealsDashboard/>} />
              <Route path="/leads-dashboard" element={<LeadsDashboard/>} />
              <Route path="/ticket-details" element={<TicketDetails/>} />
              <Route path="/companies" element={<Companies/>} />
              <Route path="/contact-details" element={<ContactDetails/>} />
              <Route path="/leads-list" element={<LeadsList/>} />
              <Route path="/leads-kanban" element={<LeadsKanban/>} />
              <Route path="/leads-details" element={<LeadsDetails/>} />
              <Route path="/pipeline" element={<PipeLine/>} />
              <Route path="/Companies-grid" element={<CompaniesGrid/>} />
              <Route path="/company-details" element={<CompanyDetails/>} />
              <Route path="/deals" element={<Deals/>} />
              <Route path="/deals-kanban" element={<DealsKanban/>} />
              <Route path="/analytics" element={<Analytics/>} />
              <Route path="/deals-details" element={<DealsDetails/>} />
              <Route path="/excel-file-upload" element={<ExcelFileUpload/>} />
              <Route path="/excel-info-file-upload" element={<ExcelInfoFileUpload/>} />
              <Route path="/travel_expense_table" element={<TravelExpenseTable/>} />
              <Route path="/hod_travel_expense_approval" element={<HodTravelExpenseShow/>} />
              {/* <Route path="/*" element={<AppContainer />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default AppRouter;
