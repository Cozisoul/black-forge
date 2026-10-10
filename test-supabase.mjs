// Quick test: Insert a row into mining_rfq and check result
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lumdnheewchxbiptxyao.supabase.co';
const supabaseKey = 'sb_publishable_caQuoCTefw5fosgZk2FhaA_yRxjFvAC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing Supabase connection...');
  console.log('URL:', supabaseUrl);
  console.log('Key prefix:', supabaseKey.substring(0, 20) + '...');
  
  const { data, error } = await supabase
    .from('mining_rfq')
    .insert([
      {
        procurement_officer: 'TEST_AGENT',
        mine_site_name: 'TEST_MINE_SITE',
        target_shaft: 'SHAFT_TEST',
        equipment_category: 'HAND_TOOLS',
        urgency_level: 'ROUTINE',
        manifest_details: 'This is an automated test from the dev environment.'
      }
    ])
    .select();

  if (error) {
    console.error('❌ INSERT FAILED:', JSON.stringify(error, null, 2));
  } else {
    console.log('✅ INSERT SUCCESS:', JSON.stringify(data, null, 2));
  }
}

testInsert();
