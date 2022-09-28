import { CareerEntity } from '@modules/careers/entities/career.entity';
import { CompanyEntity } from '@modules/companies/entities/company.entity';
import { JobEntity } from '@modules/jobs/entities/job.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import {
  EmploymentType,
  ExpLevel,
  Workplace,
} from '@vnact/recruiter-shared-enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

const jobs = [
  {
    title: 'Backend Developer',
    companyName: 'Google',
    description: `**Job Title: NodeJS Developer**

    **The job:**
    
    - Join hands and give ideas to develop some project of the company
    - Job description will be discussed during the interview for details.
    
    **Your Skills and Experience:**
    
    - ****Have knowledge or experience about NodeJS (For FRESHER level)
    - Have **strong foundation on algorithm/problem-solving skills**
    - Have a strong **foundation on databases**: write optimal queries, normalization/denormalization, optimize DB performance, table partitioning, etc.
    - Bachelor degree in Information Technology/Computer Science or equivalent.
    - Familiar with web service integration (REST, JSON, GraphQL).
    - Good practice in modern development processes; Test driven development, continuous integration etc.
    - Good team and communication skills.
    - Good at speaking English
    - Willing to learn new technologies and tools.
    
    **Benefits**:
    
    - **Salary:(Upto 15M)** Attractive salary and quarter bonus based on performance.
    - Salary review 2 times/year
    - Full benefits for employees according to the Vietnam Labor Laws: social and health insurance
    - An international, professional, young but innovative, knowledge-shared environment that works closely with international experts and joins conferences and workshops on exciting new technologies.
    - Holidays based on Vietnamese labor law + paid vacations
    - Opportunity to onsite in the US
    - Company trip, Team Building`,
    employmentType: [EmploymentType.FullTime, EmploymentType.Internship],
    gpsLng: 105.7877964,
    gpsLat: 20.9798101,
    workplaces: [Workplace.OnSite],
    recruits: 5,
    recruiterEmail: 'cuong.nl5.kma@gmail.com',
    careerName: 'Backend Developer',
    level: ExpLevel.OnePlus,
    minSalary: 900,
    maxSalary: 1400,
    location: 'Ha Noi',
  },
  {
    title: 'Senior Tester (Manual)',
    companyName: 'Amazon',
    description: `**Job Purpose**

    - Study the documents as input for the testing process, determine the list of objects to be tested, the test environment. Plan implementation, ensure test quality for developments/modifications/projects on the system.
    - Coordinate with other departments to perform tests and report test results 20% more developments/projects than Testers.
    - Guaranteed SLA defect rate for Senior Testers (0.05% error after Go Live ~ 0.5 error/1000 test case)
    - Learn and apply standardization, automation, advanced testing tools and knowledge
    - Perform other tasks as assigned by the Unit Leader
    
    **Risk management and compliance**
    
    - Manage bugs according to software testing process. Coordinate with related departments to fix errors.
    - Identify and proactively detect risks during operation, coordinate with relevant units to devise methods of measuring and minimizing risks.
    - Perform work in accordance with policies, regulations, processes, guidelines, designs and service quality commitments (SLAs); Use and update the standard set of Test Case Library (Master Test Case Library)
    
    **Success Profile - Qualification and Experiences**
    
    - Bachelor degree or higher, major in IT or electronic telecommunication
    - Language proficiency: English according to TCB's regulations in each period
    
    Experience:
    
    - In-depth knowledge of information technology systems in the banking sector
    - Deep understanding of research methods to apply to technology improvement research activities
    - More than 3 years of experience working in the field of information technology, especially in the banking sector.`,
    employmentType: [EmploymentType.FullTime, EmploymentType.Internship],
    gpsLng: 105.7877964,
    gpsLat: 20.9798101,
    workplaces: [Workplace.OnSite],
    recruits: 10,
    recruiterEmail: 'lamsonkma@gmail.com',
    careerName: 'Tester',
    level: ExpLevel.ThreePlus,
    maxSalary: 5000,
    location: 'Ha Noi',
  },
  {
    title: 'Software Engineer, Trilogy (Remote) - $100,000/year USD',
    companyName: 'Tiki',
    description: `Crossover is the world's #1 source of full-time remote jobs. Our clients offer top-tier pay for top-tier talent. We're recruiting this role for our client, Trilogy. Have you got what it takes?

    “Coding competitions are for university students” - Wrong.
    
    “Competitive programming is a sport for your free time. Building a software development career is something completely different” - Incorrect.
    
    “Software developers work in Agile teams. You need to collaborate and participate in daily project and team meetings.” - Not when you are with us.
    
    Trilogy uses cloud-native technologies to improve software products for dozens of customers, and we are looking for veteran competitive programmers to help us. We have reinvented the software development process to break down product specs and milestones into individual code challenges with 4-8 hour SLAs, and your job is to crack the problem and beat the clock. It’s no different from a coding competition - except for the $100k salary and the chance to quadruple your compensation as you move up the Engineering ladder.
    
    The future of work started long ago with us. Home office twice a week? We have been working from wherever we want for the last fifteen years in our 100% remote model. While scrum rituals and daily standups are still dominating the rest of the industry, our team is already operating under a global asynchronous model where each developer follows 8-hour shifts three or four days a week, plans the rest of their workweek flexibly, and never exceeds 40 hours. The development operates 24x7, but you are free to choose your own schedule!
    
    This role will challenge and develop you like no other while still providing the perks for optimal work-life balance. Apply today to join our team!
    
    **What You Will Be Doing**
    
    - Implementing new features on existing software products by solving complex implementation problems and making the appropriate technical decisions.
    - Fixing bugs to permanently eliminate defects that impair product functionality.
    - Reviewing code from other developers to ensure they meet strict code quality standards and will not cause a regression.
    - Performing root cause analyses that investigate defects based on reported outages, and create product fixes.
    
    **What You Won't Be Doing**
    
    - Dealing with unclear expectations or non-technical managers. Every task will have a clear scope and objective for you to implement, defined by a technical VP of Engineering.
    - Executing repeated tasks for the same product using the same tech stack. Our portfolio of 60+ products ensures you are always tackling new challenges.
    - Managing projects or stakeholders. We have automated management overhead so you can focus entirely on programming.
    
    **Software Engineer Key Responsibilities**
    
    Deliver flawless features and bug fixes that make customers delighted with Trilogy products.
    
    **Basic Requirements**
    
    - 5+ years of software development experience, enabling senior-level programming skills and basic software architecture expertise
    - Proven experience as a competitive coder
    - Availability to work in at least one of the 8-hour shift options starting at 3 am, 11 am, or 7 pm UTC during three or four days a week (shift rotation includes work during weekends)
    - A drive to develop yourself and push your limits, embracing direct feedback and a high-quality bar
    
    **About Trilogy**
    
    Hundreds of software businesses run on the Trilogy Business Platform. For three decades, Trilogy has been known for 3 things: Relentlessly seeking top talent, Innovating new technology, and incubating new businesses. Our technological innovation is spearheaded by a passion for simple customer-facing designs. Our incubation of new businesses ranges from entirely new moon-shot ideas to rearchitecting existing projects for today's modern cloud-based stack. Trilogy is a place where you can be surrounded with great people, be proud of doing great work, and grow your career by leaps and bounds.
    
    There is so much to cover for this exciting role, and space here is limited. Hit the Apply button if you found this interesting and want to learn more. We look forward to meeting you!
    
    **Working with Crossover**
    
    This is a full-time (40 hours per week), long-term position. The position is immediately available and requires entering into an independent contractor agreement with Crossover. The compensation level for this role is $50 USD/hour, which equates to $100,000 USD/year assuming 40 hours per week and 50 weeks per year. The payment period is weekly. Consult www.crossover.com/help-and-faqs for more details on this topic.
    
    **What to expect next:**
    
    - You will receive an email with a link to start your self-paced, online job application.
    - Our hiring platform will guide you through a series of online “screening” assessments to check for basic job fit, job-related skills, and finally a few real-world job-specific assignments.
    
    **Important!**
    
    If you do not receive an email from us:
    
    - First, emails may take up to 15 minutes to send, refresh and check again.
    - Second, check your spam and junk folders for an email from Crossover.com, mark as “Not Spam” since you will receive other emails as well.
    - Third, we will send to whatever email account you indicated on the Apply form - by default, that is the email address you use as your LinkedIn username and it might be different than the one you have already checked.`,
    employmentType: [EmploymentType.FullTime, EmploymentType.Internship],
    gpsLng: 105.781911,
    gpsLat: 21.045028,
    workplaces: [Workplace.Remote, Workplace.Hybird],
    recruits: 10,
    recruiterEmail: 'daclip26@gmail.com',
    careerName: 'Software Engineer',
    level: ExpLevel.OnePlus,
    maxSalary: 2000,
    location: 'Ha Noi',
  },
];

export class SeedJob1664376834954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const jobData of jobs) {
      const { companyName, recruiterEmail, careerName, ...fields } = jobData;
      const [company, recruiter] = await Promise.all([
        queryRunner.manager.findOneBy(CompanyEntity, { name: companyName }),
        queryRunner.manager.findOneBy(UserEntity, { email: recruiterEmail }),
        queryRunner.manager.findOneBy(CareerEntity, { name: careerName }),
      ]);
      const job = queryRunner.manager.create(JobEntity, {
        ...fields,
        company,
        recruiter,
        startDate: new Date(),
        gender: [],
      });
      await queryRunner.manager.save(job);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('job_skill');
    await queryRunner.clearTable('jobs');
  }
}
