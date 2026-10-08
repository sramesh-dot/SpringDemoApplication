pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
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

        stage('Backend Docker Build') {
            steps {
                bat 'docker build -t studentapp-backend:latest ./backend'
            }
        }

        stage('Frontend Docker Build') {
            steps {
                bat 'docker build -t studentapp-frontend:latest ./frontend'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose up -d'
            }
        }
    }
}