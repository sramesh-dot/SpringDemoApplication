pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials',
                git branch: 'master',
                    url: 'https://github.com/sramesh-dot/StudentApp'
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    bat 'mvn test'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
    }
}