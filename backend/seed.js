import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

// Script para criar usuários de teste
async function createTestUsers() {
  const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
      console.error('❌ Erro ao conectar ao banco:', err)
      process.exit(1)
    }
  })

  try {
    // Dados dos usuários de teste
    const testUsers = [
      {
        id: uuidv4(),
        name: 'Prof. João Silva',
        email: 'professor@example.com',
        password: 'senha123',
        role: 'professor',
        profile_image: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Aluno Pedro Santos',
        email: 'aluno@example.com',
        password: 'senha123',
        role: 'aluno',
        profile_image: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    // Hash das senhas
    for (const user of testUsers) {
      user.password = await bcrypt.hash(user.password, 10)
    }

    // Inserir usuários
    for (const user of testUsers) {
      db.run(
        `INSERT INTO users (id, name, email, password, role, profile_image, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [user.id, user.name, user.email, user.password, user.role, user.profile_image, user.created_at, user.updated_at],
        function(err) {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
              console.log(`⚠️ Usuário ${user.email} já existe`)
            } else {
              console.error(`❌ Erro ao criar usuário ${user.email}:`, err)
            }
          } else {
            console.log(`✅ Usuário criado: ${user.name} (${user.email})`)
            console.log(`   Email: ${user.email}`)
            console.log(`   Senha: senha123`)
            console.log(`   Tipo: ${user.role === 'professor' ? 'Professor 👨‍🏫' : 'Aluno 👨‍🎓'}`)
            console.log('')
          }
        }
      )
    }

    // Fechar conexão após um tempo
    setTimeout(() => {
      db.close((err) => {
        if (err) console.error(err)
        console.log('✅ Script de seed concluído!')
      })
    }, 2000)

  } catch (error) {
    console.error('❌ Erro no script:', error)
    process.exit(1)
  }
}

console.log('🌱 Criando usuários de teste...\n')
createTestUsers()
