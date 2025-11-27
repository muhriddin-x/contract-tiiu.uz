module.exports = {
  apps: [
    // Production Blue
    {
      name: '@mentalaba-crm/tiiu_live',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/mnt/sas0/production/crm/crm-tiiu/tiiu_live',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1000M',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      wait_ready: false,
      listen_timeout: 30000,
      kill_timeout: 10000,
      env: {
        NODE_ENV: 'production',
        PORT: 3014,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3014,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: './logs/blue-out.log',
      error_file: './logs/blue-error.log',
      combine_logs: true,
      time: true,
    },

    // Production Green
    {
      name: '@mentalaba-crm/tiiu_staging',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/mnt/sas0/production/crm/crm-tiiu/tiiu_staging',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1000M',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      wait_ready: false,
      listen_timeout: 30000,
      kill_timeout: 10000,
      env: {
        NODE_ENV: 'production',
        PORT: 3015,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3015,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: './logs/green-out.log',
      error_file: './logs/green-error.log',
      combine_logs: true,
      time: true,
    },
  ],
};
