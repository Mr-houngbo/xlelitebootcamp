const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function createAdminUser() {
  console.log('🚀 Creating admin user...');
  
  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        // Add timeout and SSL options
        db: {
          schema: 'public'
        },
        global: {
          headers: {
            'Connection': 'keep-alive'
          }
        }
      }
    );

    // Utilise NEXT_PUBLIC_ADMIN_EMAIL (défini dans .env.local) et ADMIN_PASSWORD
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        'NEXT_PUBLIC_ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env.local\n' +
        'Ajoutez ADMIN_PASSWORD=votre_mot_de_passe dans votre .env.local'
      );
    }

    console.log(`📧 Creating admin user: ${adminEmail}`);
    console.log(`🔗 Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);

    // Try to create the user
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        is_admin: true
      }
    });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        console.log('✅ Admin user already exists');
        console.log('\n🎯 Next steps:');
        console.log('1. Go to http://localhost:3000/admin/login');
        console.log(`2. Login with: ${adminEmail}`);
        console.log(`3. Password: ${adminPassword}`);
        console.log('4. Access dashboard!');
        return;
      } else {
        throw error;
      }
    } else {
      console.log('✅ Admin user created successfully!');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    }

    console.log('\n🎯 Next steps:');
    console.log('1. Go to http://localhost:3000/admin/login');
    console.log(`2. Login with: ${adminEmail}`);
    console.log(`3. Password: ${adminPassword}`);
    console.log('4. Access dashboard!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    console.log('\n🔧 Alternative solution:');
    console.log('1. Go to your Supabase dashboard: https://descvtwedjbxxrgaecww.supabase.co');
    console.log('2. Navigate to Authentication > Users');
    console.log('3. Click "Add user"');
    console.log(`4. Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`5. Password: ${process.env.ADMIN_PASSWORD}`);
    console.log('6. Check "Auto-confirm email"');
    console.log('7. Click "Create user"');
    process.exit(1);
  }
}

if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser };
