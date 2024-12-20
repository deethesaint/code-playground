import { createRouter, createWebHistory } from "vue-router";
import UserLayout from "@/components/templates/UserLayout/UserLayout.vue";
import AdminLayout from "@/components/templates/AdminLayout/AdminLayout.vue";
import ChangePassword from "@/components/pages/Password/ChangePassword.vue";
import IdVerification from "@/components/pages/Verification/IdVerification.vue";
import Posts from "@/components/pages/Post/Posts.vue";
const ContestRanking = () => import("@/components/pages/Contest/ContestRanking.vue");
const Dashboard = () => import("@/components/pages/Contributor/Dashboard.vue");
const PostPage = () => import("@/components/pages/Post/PostPage.vue");
const UserEmailVerification = () => import("@/components/pages/Email/UserEmailVerification.vue");
const ForgotPassword = () => import("@/components/pages/ForgotPassword.vue");
const ResetPassword = () => import("@/components/pages/ResetPassword.vue");
const ProfileCV = () => import("@/components/pages/ProfileCV.vue");
const MyCVPanel = () => import("@/components/pages/MyCVPanel.vue");
const ContestResult = () => import("@/components/pages/Contest/ContestResult.vue");
const CodePanel = () => import("@/components/pages/CodePanel.vue");
const Landing = () => import("@/components/pages/Landing.vue");
const Login = () => import("@/components/authentication/Login.vue");
const Register = () => import("@/components/authentication/Register.vue");
const NotFound = () => import("@/components/errors/NotFound.vue");
const AboutUs = () => import("@/components/pages/AboutUs.vue");
const Contests = () => import("@/components/pages/Contests.vue");
const Problems = () => import("@/components/pages/Problems.vue");
const Career = () => import("@/components/pages/Career.vue");
const Profile = () => import("@/components/pages/Profile.vue");
const ContestDetail = () => import('@/components/pages/ContestDetail.vue');
const ContestPanel = () => import('@/components/pages/ContestPanel.vue');
const CvBuilder = () => import("@/components/pages/CvBuilder.vue");
const CvShowPDF = () => import("@/components/pages/CvShowPDF.vue");
const JobManager = () => import("@/components/pages/JobManagement.vue");
const JobApplied = () => import("@/components/pages/JobApplied.vue");
const DetailJobs = () => import("@/components/pages/DetailJobs.vue");
const ViewCompany = () => import("@/components/pages/ViewCompany.vue");
const RecruitmentManagement = () => import("@/components/pages/Recruitment/RecruitmentManagement.vue");
const JobsManagement = () => import("@/components/pages/Recruitment/JobsManagement.vue");
const AddJob = () => import("@/components/pages/Recruitment/AddJob.vue");
const DetailJobM = () => import("@/components/pages/Recruitment/DetailJobM.vue");
const ViewUser = () => import("@/components/pages/Recruitment/ViewUser.vue");
const AdminDashboard = () => import("@/components/pages/Admin/DashboardAdmin.vue");
const AdminHome = () => import("@/components/pages/Admin/HomeAdmin.vue");
const AdminProfile = () => import("@/components/pages/Admin/ProfileAdmin.vue");
const AdminUserM = () => import("@/components/pages/Admin/UserAdmin.vue");
const SubscribeCompanyM = () => import("@/components/pages/Admin/SubscribeCompanyM.vue");
const SubscribeContributorM = () => import("@/components/pages/Admin/SubscribeContributorM.vue");
const ApplicationsM = () => import("@/components/pages/Admin/ApplicationsM.vue");
const JobIT = () => import("@/components/pages/JobIT.vue");
const ProblemsM = () => import("@/components/pages/Admin/ProblemsM.vue");
const ConstestsM = () => import("@/components/pages/Admin/ContestsM.vue");
const ContestManagement = () => import("@/components/pages/Recruitment/ContestManagement.vue");
const ParticipationContest = () => import("@/components/pages/Recruitment/ParticipationContest.vue");
const UpgradePlan = () => import("@/components/pages/Recruitment/UpgradePlan.vue");
const  Checkout =()=> import("@/components/pages/Recruitment/Checkout.vue");
const OrderHistory = () => import("@/components/pages/Recruitment/OrderHistory.vue");
const Statistics = () => import("@/components/pages/Admin/StatisticsM.vue");
const vnpayReturn =  ()=> import("@/components/pages/Recruitment/VnpayReturn.vue");
const routes = [
    {
        path: '/u',
        component: UserLayout,
        children: [
            {
                path: '/problem/:id',
                component: CodePanel,
                name: 'problem'
            },
            {
                path: '/',
                component: Landing,
                name: 'landing'
            },
            {
                path: '/login',
                component: Login,
                name: 'login'
            },
            {
                path: '/register',
                component: Register,
                name: 'register'
            },
            {
                path: '/about-us',
                component: AboutUs,
                name: 'about-us'
            },
            {
                path: '/contests',
                component: Contests,
                name: 'contest-page'
            },
            {
                path: '/problems',
                component: Problems,
                name: 'problems'
            },
            {
                path: '/career',
                component: Career,
                name: 'career'
            },
            {
                path: '/profile/:id',
                component: Profile,
                name: 'profile',
                props: true
            },
            {
                path: '/contest/:c_id',
                component: ContestDetail,
                name: 'contest-detail'
            },
            {
                path: '/contest/participate/:c_id',
                component: ContestPanel,
                name: 'contest-participate'
            },
            {
                path: '/MyCv',
                component: MyCVPanel,
                name: 'MyCv'
            },
            {
                path: '/contest',
                name: 'contest',
                children: [
                    {
                        path: ':id/result/',
                        component: ContestResult,
                    },
                    {
                        path: ':id/:user_id/result/',
                        component: ContestResult
                    },
                    {
                        path: ':id/ranking/',
                        component: ContestRanking
                    }
                ]
            },
            {
                path: '/ProfileCV',
                component: ProfileCV,
                name: 'code-playground-cv'
            },
            {
                path: '/CvBuilder/:id',
                component: CvBuilder,
                name: 'cvbuilder'
            },
            {
                path: '/forgot-password',
                component: ForgotPassword,
                name: 'forgot-password'
            },
            {
                path: '/reset-password/:resetToken',
                component: ResetPassword,
                name: 'reset-password'
            },
            {
                path: '/cv/show/:id',
                component: CvShowPDF,
                name: 'cv-show'
            },
            {
                path: '/Job-manager',
                component: JobManager,
                name: 'job-manager'
            },
            {
                path: '/Job-applied',
                component: JobApplied,
                name: 'job-applied'
            },
            {
                path: '/:pathMatch(.*)*',
                component: NotFound,
                name: 'notfound'
            },
            {
                path: '/Job-detail/:id',
                component: DetailJobs,
                name: 'job-detail'
            },
            {
                path: '/View-Company/:id',
                component: ViewCompany,
                name: 'view-company'
            },
            {
                path: '/Info-Recruitment',
                component: RecruitmentManagement,
                name: 'info-recruitment'
            },
            {
                path: '/Jobs-Management',
                component: JobsManagement,
                name: 'jobs-management'
            },
            {
                path: '/UpgradePlan',
                component: UpgradePlan,
                name: 'upgrade-plan'
            },
            {
                path:'/checkout',
                component: Checkout,
                name: 'checkout',
            },
            {
                path:'/checkout/vnpay-return',
                component: vnpayReturn,
                name: 'vnpay-return',
            },
            {
                path:'/order-history',
                component: OrderHistory,
                name: 'order-history'
            },
            {
                path: '/Add-Job',
                component: AddJob,
                name: 'add-job'
            },
            {
                path: '/Detail-Job/:id',
                component: DetailJobM,
                name: 'detail-job'
            },
            {
                path: '/View-User/:id',
                component: ViewUser,
                name: 'view-user'
            },
            {
                path: '/verify-email',
                component: UserEmailVerification,
                name: 'verify-email'
            },
            {
                path: '/contributor',
                component: Dashboard,
                name: 'contributor-dashboard'
            },
            {
                path: '/contest-management',
                component: ContestManagement,
                name: 'contest-management'
            },
            {
                path: '/participation-contest/:id',
                component: ParticipationContest,
                name: 'participation-contest'
            },
            {
                name: 'job-it',
                path: '/job-it/:keyword',
                component: JobIT
            },
            {
                name: 'job-it-all',
                path: '/job-it/',
                component: JobIT
            },
            {
                path: '/posts',
                component: Posts,
                name: 'posts'
            },
            {
                path: '/post/:slug',
                component: PostPage,
                name: 'post-page'
            },
            {
                path: '/change-password',
                component: ChangePassword
            },
            {
                path: '/id-verify',
                component: IdVerification
            }
        ]
    },
    {
        path: '/a',
        component: AdminLayout,
        children: [
            {
                path: '/admin',
                component: AdminDashboard,
                name: 'admin-dashboard',
                children: [
                    {
                        name: 'homeAdmin',
                        path: 'home',
                        component: AdminHome
                    },
                    {
                        name: 'profileAdmin',
                        path: 'profile',
                        component: AdminProfile
                    },
                    {
                        name: 'user-management',
                        path: 'user',
                        component: AdminUserM
                    },
                    {
                        name: 'subscribe-company-management',
                        path: 'subscribe/company',
                        component: SubscribeCompanyM
                    },
                    {
                        name: 'subscribe-contributor-management',
                        path: 'subscribe/contributor',
                        component: SubscribeContributorM
                    }, {
                        name: 'applications-management',
                        path: 'applications',
                        component: ApplicationsM
                    }, {
                        name: 'problems-management',
                        path: 'problems',
                        component: ProblemsM
                    }, {
                        name: 'contests-management',
                        path: 'contests',
                        component: ConstestsM
                    },
                    {
                        name : 'statistics-management',
                        path : 'statistics',
                        component : Statistics
                    }
                ]
            },
        ]
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
    }
})
