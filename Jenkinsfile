pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-push-creds',
                    url: 'https://github.com/username/StudentApp'
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