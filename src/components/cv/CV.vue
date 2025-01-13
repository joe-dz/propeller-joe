<template>
  <div class="flex-start main-container theme-regular">
    <div class="control-panel width-fill-available flex-stretch-horizontal padding-1 font-weight-600">
      <div v-text="fullName"></div>
      <div>
        <a
          class="flex-stretch-horizontal gap-06"
          href="https://joe.propeller.rs"
        >
          <div>Propeller Software</div>
          <img
            src="/images/logo_propeller.png"
            class="icon-container item-icon"
            alt=""
          />
        </a>
      </div>
    </div>
    <div class="flex-start control-panel width-fill-available padding-1 theme-regular">
      <div class="font-weight-600">Info</div>
      <div class="flex-start control-panel width-fill-available padding-1 theme-bright">
        <info-section
          v-for="infoSection in infoSections"
          :model="infoSection"
        />
      </div>
    </div>
    <div
      v-for="tagCollection in tagCollections"
      class="flex-start control-panel width-fill-available padding-1 theme-bright"
    >
      <div v-text="tagCollection.title" class="font-weight-600"></div>
      <template v-if="tagCollection.items">
        <div class="flex-row">
          <tag-container
            v-for="tagItem in tagCollection.items"
            :proficiency="tagItem.proficiency"
            :icon="tagItem.icon"
            :name="tagItem.name"
          />
        </div>
      </template>
      <template v-else-if="tagCollection.subCollections">
        <div
          v-for="subCollection in tagCollection.subCollections"
          class="flex-start control-panel width-fill-available padding-1 theme-bright"
        >
          <div v-text="subCollection.title" class="font-weight-600"></div>
          <template v-if="subCollection.items">
            <div class="flex-row">
              <tag-container
                v-for="tagItem in subCollection.items"
                :proficiency="tagItem.proficiency"
                :icon="tagItem.icon"
                :name="tagItem.name"
              />
            </div>
          </template>
        </div>
      </template>
    </div>
    <div class="flex-start control-panel width-fill-available padding-1 theme-regular">
      <div class="font-weight-600">About me</div>
      <div class="flex-start control-panel width-fill-available padding-1 theme-bright">
        <div>
          When it comes to web development, I'm a jack of all trades,
          master of none. Not an expert in any of the things above, they are mostly just means
          to an end. There are some exceptions such as Scala, which is a great programming language,
          CloudStack, which offers great value by enabling individuals and small companies to
          be their own cloud providers, or VueJS which is a quick-to-learn frontend framework.
        </div>
        <div>
          In my spare time, I like building web applications that are actually useful to non-technical
          people, as well as building computers. Recently, I built my own cloud infrastructure as
          a proof of concept and learned a lot along the way. Many of the items from the skill list
          above I've been setting up, administering, and maintaining myself, from networking to
          CI/CD and other tools.
        </div>
        <div>
          I've worked for many companies and clients, including my own. Sometimes by myself, but
          mostly in international teams of varying sizes. My vision of a good employer, team, and
          workplace is not based on individual benefits or titles. It only takes a team with good
          chemistry and a dedicated time and place to deliver great results.
        </div>
      </div>
    </div>
    <div class="flex-start control-panel width-fill-available padding-1 theme-regular">
      <div class="font-weight-600">Experience</div>
      <experience-section
        v-for="experienceSection in experienceSections"
        :model="experienceSection"
      >
        <template #client>
          <span v-html="experienceSection.client"></span>
        </template>
      </experience-section>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagContainer from "@/components/cv/SkillTag.vue";
import ExperienceSection from "@/components/cv/ExperienceSection.vue";
import InfoSection from "@/components/cv/InfoSection.vue";

const infoSections = [
  {
    title: "Years of experience",
    content: "13"
  },
  {
    title: "Education",
    content: `
      <div>Undergraduate of Computer Science at
        <a
          href="https://ftn.uns.ac.rs/engfaculty-of-technical-sciences-eng/"
          target="_blank"
        >FTN</a>, Novi Sad
      </div>
    `
  },
  {
    title: "Place of residence",
    content: "Novi Sad, Serbia"
  },
  {
    title: "Contact",
    content: `
      <div>
        <a
          href="mailto:joe@propeller.rs"
          target="_blank"
        >joe@propeller.rs</a>
      </div>
    `
  }
]

const tagCollections = [
  {
    title: "Programming languages",
    items: [
      {proficiency: "advanced", icon: "java.png", name: "Java"},
      {proficiency: "advanced", icon: "javascript.svg", name: "JavaScript"},
      {proficiency: "intermediate", icon: "typescript.svg", name: "TypeScript"},
      {proficiency: "intermediate", icon: "html5.svg", name: "HTML5"},
      {proficiency: "intermediate", icon: "scss.svg", name: "SCSS"},
      {proficiency: "intermediate", icon: "scala.svg", name: "Scala"},
      {proficiency: "intermediate", icon: "php.svg", name: "PHP"}
    ]
  },
  {
    title: "Frontend",
    subCollections: [
      {
        title: "Frameworks",
        items: [
          {proficiency: "advanced", icon: "vuejs.svg", name: "VueJS 2/3"},
          {proficiency: "beginner", icon: "react.svg", name: "React"},
          {proficiency: "beginner", icon: "angular.svg", name: "Angular"}
        ]
      },
      {
        title: "Libraries",
        items: [
          {proficiency: "intermediate", icon: "vuex.svg", name: "Vuex"},
          {proficiency: "intermediate", icon: "vuejs.svg", name: "vue-router"},
          {proficiency: "intermediate", icon: "axios.png", name: "Axios"},
          {proficiency: "intermediate", icon: "primevue.png", name: "PrimeVue"},
          {proficiency: "beginner", icon: "pinia.svg", name: "Pinia"},
          {proficiency: "beginner", icon: "webpack.svg", name: "Webpack"}
        ]
      }
    ]
  },
  {
    title: "Backend",
    subCollections: [
      {
        title: "Frameworks",
        items: [
          {proficiency: "advanced", icon: "spring.svg", name: "Spring"},
          {proficiency: "advanced", icon: "hibernate.svg", name: "Hibernate"},
          {proficiency: "intermediate", icon: "laravel.svg", name: "Laravel"},
          {proficiency: "beginner", icon: "axon.svg", name: "Axon"},
          {proficiency: "beginner", icon: "symfony.svg", name: "Symfony"},
          {proficiency: "beginner", icon: "play.svg", name: "Play"}
        ]
      },
      {
        title: "Libraries",
        items: [
          {proficiency: "advanced", icon: "flyway.png", name: "Flyway"},
          {proficiency: "intermediate", icon: "thymeleaf.png", name: "Thymeleaf"},
          {proficiency: "beginner", icon: "jasper.jpg", name: "Jaspersoft"}
        ]
      }
    ],
  },
  {
    title: "Databases",
    items: [
      {proficiency: "advanced", icon: "postgresql.svg", name: "PostgreSQL"},
      {proficiency: "intermediate", icon: "mysql.svg", name: "MySQL"},
      {proficiency: "beginner", icon: "mongodb.svg", name: "MongoDB"}
    ]
  },
  {
    title: "Event streaming",
    items: [
      {proficiency: "advanced", icon: "kafka.svg", name: "Kafka"},
      {proficiency: "intermediate", icon: "rabbitmq.svg", name: "RabbitMQ"}
    ]
  },
  {
    title: "Networking",
    items: [
      {proficiency: "advanced", icon: "bind.png", name: "Bind"},
      {proficiency: "advanced", icon: "nginx.svg", name: "Nginx"},
      {proficiency: "intermediate", icon: "wireguard.svg", name: "WireGuard"},
      {proficiency: "intermediate", icon: "openvpn.svg", name: "OpenVPN"},
    ]
  },
  {
    title: "Virtualization",
    items: [
      {proficiency: "advanced", icon: "docker.svg", name: "Docker"},
      {proficiency: "advanced", icon: "docker-compose.webp", name: "Docker Compose"},
      {proficiency: "intermediate", icon: "kubernetes.svg", name: "Kubernetes"},
      {proficiency: "intermediate", icon: "helm.svg", name: "Helm"},
      {proficiency: "beginner", icon: "docker-swarm.png", name: "Docker Swarm"}
    ]
  },
  {
    title: "Infrastructure",
    items: [
      {proficiency: "advanced", icon: "hetzner.svg", name: "Hetzner Cloud"},
      {proficiency: "intermediate", icon: "opentofu.png", name: "OpenTofu/Terraform"},
      {proficiency: "intermediate", icon: "cloudstack.svg", name: "CloudStack"},
      {proficiency: "intermediate", icon: "aws-cli.png", name: "aws-cli"},
      {proficiency: "intermediate", icon: "k9s.png", name: "k9s"},
      {proficiency: "intermediate", icon: "cloud-init.svg", name: "cloud-init"}
    ]
  },
  {
    title: "Development tools",
    items: [
      {proficiency: "advanced", icon: "git.svg", name: "Git"},
      {proficiency: "intermediate", icon: "maven.svg", name: "Maven"},
      {proficiency: "intermediate", icon: "nodejs.svg", name: "NodeJS"},
      {proficiency: "intermediate", icon: "npm.svg", name: "npm"},
    ]
  },
  {
    title: "Infrastructure",
    items: [
      {proficiency: "advanced", icon: "jenkins.svg", name: "Jenkins"},
      {proficiency: "advanced", icon: "jira.svg", name: "Jira"},
      {proficiency: "advanced", icon: "bitbucket.svg", name: "BitBucket"},
      {proficiency: "intermediate", icon: "sonarqube.svg", name: "SonarQube"},
      {proficiency: "intermediate", icon: "argocd.png", name: "ArgoCD"},
      {proficiency: "intermediate", icon: "portainer.svg", name: "Portainer"},
      {proficiency: "intermediate", icon: "nexus.png", name: "Nexus"},
      {proficiency: "intermediate", icon: "pgadmin.png", name: "pgAdmin"},
      {proficiency: "intermediate", icon: "nextcloud.svg", name: "NextCloud"},
      {proficiency: "beginner", icon: "elastic.svg", name: "ELK"}
    ]
  },
  {
    title: "Other",
    items: [
      {proficiency: "intermediate", icon: "keycloak.png", name: "Keycloak"},
      {proficiency: "intermediate", icon: "mailhog.webp", name: "MailHog"},
      {proficiency: "intermediate", icon: "postfix.png", name: "Postfix"},
      {proficiency: "intermediate", icon: "dovecot.svg", name: "Dovecot"},
      {proficiency: "intermediate", icon: "postfix-admin.png", name: "Postfix Admin"}
    ]
  },
  {
    title: "Legend",
    items: [
      {proficiency: "advanced", icon: "", name: "advanced"},
      {proficiency: "intermediate", icon: "", name: "intermediate"},
      {proficiency: "beginner", icon: "", name: "beginner"}
    ]
  }
]

const experienceSections = [
  {
    role: "Developer",
    sectors: "IoT home automation",
    client: `
      <a href="https://www.telekom.com/en" target="_blank">Deutsche Telekom</a>
      via
      <a href="https://www.mediaan.com/" target="_blank">Mediaan</a>
    `,
    duration: "2020 - 2023",
    description: `
      Created and maintained various Java services within a microservice ecosystem.
      One of them involved data exchange via REST APIs and/or Kafka streams, and its
      subsequent aggregation in a database in order to provide insights into how
      customers used our services. Also worked on VueJS 2/3 front-end application
      development, as well as a devops engineer on a Kubernetes GitOps infrastructure
      hosted on AWS.
    `
  },
  {
    role: "Developer",
    sectors: "Energy trading",
    client: `<a href="https://etpa.nl/en/" target="_blank">ETPA</a>`,
    duration: "2019 - 2020",
    description: `
      Focus of this client’s business is an energy trading platform which requires
      reliable and scalable solutions based on microservices and event sourcing.
      My responsibilities include the development of backend and frontend applications,
      as well as mentoring a junior colleague.
    `
  },
  {
    role: "Developer, Scrum master",
    sectors: "Energy, renewable energy, and mobility",
    client: `<a href="https://servicehouse.nl/en" target="_blank">ServiceHouse</a>`,
    duration: "2018 - 2019",
    description: `
      With this client I was involved in multiple projects. The team was charged with development and
      maintenance of services such as:
      <br>Enwire - a multi-tenant platform for facilitating the sale of renewable energy parts, both wind and solar.
      <br>Enrollment - a service used for enrolling potential clients into the SH ecosystem.
      <br>Output - a service for generating and sending multiple types of documents for various purposes
      (invoices, welcome emails, down payment slips etc).
      <br>Responsibilities included involvement in solution design, setting up the initial project, development of
      required functionalities. Other activities included code reviews and mentoring of younger colleagues.
    `
  },
  {
    role: "Developer",
    sectors: "Legal",
    client: `
      <a href="https://www.sdu.nl/" target="_blank">SDU</a>
      via
      <a href="https://novalite.rs/" target="_blank">NovaLite</a>
    `,
    duration: "2017",
    description: `
      Worked on XML document retrieval, processing, and search through tags/legal terms. Scala was used
      as the main programming language, and the focus was put on functional programming. Next to coding,
      one of my main responsibilities was communicating with the business analysts, and updating and
      versioning the functional requirements properly, as the changes were occurring daily (such as search
      refinements).
    `
  },
  {
    role: "Developer, QA, Requirements manager, Technical team lead",
    sectors: "Education",
    client: `<a href="https://dreamcatcherprogram.com/" target="_blank">DreamCatcher</a>`,
    duration: "2015 - 2017",
    description: `
      This project was focused on creating an interactive environment with
      the goal of helping elementary and high school students in choosing
      their future professions and careers, as well as enabling easier
      communication between school representatives, students, and their parents.
      Back-office features included data listing and generating statistical data
      and corresponding graphs.
    `
  },
  {
    role: "Developer, QA",
    sectors: "Online gambling mediation",
    client: `<a href="https://www.askgamblers.com/" target="_blank">AskGamblers</a>`,
    duration: "2014",
    description: `
      The purpose of this website was to serve as a communications link
      between the gambling websites and their end users, focusing on
      complaints and ratings. I was mostly involved in building real-time editing
      back-office pages with the goal of easy and quick problem management and
      resolution.
    `
  },
  {
    role: "Developer, Requirements manager",
    sectors: "Online ticket sales",
    client: `<a href="https://ximedes.com/" target="_blank">Ximedes</a>`,
    duration: "2011 - 2014",
    description: `
      This product was built to support event and ticket management
      for a major national football association in Western Europe.
      It included a multi-tenant back-office application and separate online
      sales channels/websites for league and national teams. Focus was on
      management of events, event locations, tickets, and additional articles.
      I was primarily assigned on backend web development, including database
      optimizations, as well as seat reservation and sales algorithms.
    `
  }
]

const fullName = import.meta.env.VITE_FULL_NAME

</script>

<style scoped lang="scss">

.theme-regular {
  --var-color-background: rgb(85, 115, 195);
  --var-color-border: rgb(80, 110, 190);
  --var-color-border-shine: rgb(90, 120, 200);
  --var-color-shade: rgba(60, 90, 170, 0.6);
}

.theme-bright {
  --var-color-background: rgb(95, 125, 205);
  --var-color-border: rgb(90, 120, 200);
  --var-color-border-shine: rgb(100, 130, 210);
  --var-color-shade: rgba(70, 100, 180, 0.6);
}

.item-icon {
  width: 1.4rem;
  height: 1.4rem;

  border-radius: 0.4rem;
}

.main-container {
  position: absolute;

  gap: 1rem;

  max-width: 52.2rem;

  padding: 1rem;
}

@keyframes scale-in {
  0% {
    transform: perspective(100rem) rotateX(120deg) scale(0);
  }
  100% {
    transform: perspective(100rem) rotateX(0deg) scale(1);
  }
}

.control-panel {
  animation: fade-in 1s linear, scale-in 1s linear;

  gap: 0.8rem;

  border-radius: 0.6rem;
  border: solid 1px var(--var-color-border);
  border-top: solid 1px var(--var-color-border-shine);
  background: var(--var-color-background);
  box-shadow: 2px 12px 12px 0 var(--var-color-shade),
  -2px 12px 12px 0 var(--var-color-shade);
}

</style>
