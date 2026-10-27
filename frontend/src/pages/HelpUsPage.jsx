import { useEffect, useState } from 'react';
import { FiCheckCircle, FiLogOut, FiSun, FiUsers } from 'react-icons/fi';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import SectionTitle from '../components/SectionTitle';

const initialForm = { name: '', email: '', scholarId: '', password: '' };

export default function HelpUsPage() {
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState(initialForm);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ signupCount: 0, treesPlanted: 0 });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadStats = async () => {
    const { data, error: statsError } = await supabase.rpc('get_signup_stats');
    if (statsError) {
      setError(statsError.message);
      return;
    }
    setStats(data);
  };

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) setError(sessionError.message);
      setUser(data.session?.user ?? null);
    });

    loadStats();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setStatus('');

    const result = mode === 'signup'
      ? await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { name: form.name, scholar_id: form.scholarId },
          },
        })
      : await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

    if (result.error) {
      setError(result.error.message);
    } else if (mode === 'signup') {
      setStatus(
        result.data.session
          ? 'Your account is ready. Thank you for helping us grow greener!'
          : 'Check your email to verify your account. Your signup will count after verification.',
      );
      setForm(initialForm);
    } else {
      setUser(result.data.user);
      setStatus('Welcome back!');
    }
    setLoading(false);
    if (!result.error) await loadStats();
  };

  const handleSignOut = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      return;
    }
    setUser(null);
    setStatus('You have been signed out.');
  };

  if (!isSupabaseConfigured) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] pt-20">
        <section className="py-16 px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <SectionTitle title="Help Us Grow" subtitle="Join our tree-planting community" />
            <p className="mt-8 text-center text-muted">
              The signup service is not configured yet. Add VITE_SUPABASE_URL and
              VITE_SUPABASE_ANON_KEY to the frontend environment before enabling signups.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-20">
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title="Help Us Grow"
            subtitle="Every verified signup brings us closer to planting another tree."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-[#F1F7F0] rounded-2xl p-8 text-center">
              <FiUsers className="w-10 h-10 mx-auto text-[#3FAE5C] mb-4" />
              <p className="text-4xl font-bold text-[#222]">{stats.signupCount}</p>
              <p className="text-muted mt-2">verified supporters</p>
            </div>
            <div className="bg-[#F1F7F0] rounded-2xl p-8 text-center">
              <FiSun className="w-10 h-10 mx-auto text-[#3FAE5C] mb-4" />
              <p className="text-4xl font-bold text-[#222]">{stats.treesPlanted}</p>
              <p className="text-muted mt-2">trees planted</p>
            </div>
          </div>

          <p className="text-center text-muted mt-6">
            We plant one tree for every 10 unique, verified supporters.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-soft p-8">
          {user ? (
            <div className="text-center">
              <FiCheckCircle className="w-12 h-12 mx-auto text-[#3FAE5C] mb-4" />
              <h2 className="text-2xl font-bold text-[#222]">Thank you for supporting us!</h2>
              <p className="text-muted mt-3">{user.email}</p>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full border border-[#ECECEC] hover:border-[#3FAE5C]"
              >
                <FiLogOut />
                Sign out
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-6">
                {['signup', 'login'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => { setMode(value); setError(''); setStatus(''); }}
                    className={`flex-1 py-2 rounded-full font-medium capitalize ${
                      mode === value ? 'bg-[#3FAE5C] text-white' : 'bg-[#F1F7F0] text-[#222]'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full px-4 py-3 rounded-xl border border-[#ECECEC]" />
                    <input name="scholarId" value={form.scholarId} onChange={handleChange} placeholder="Scholar ID" required className="w-full px-4 py-3 rounded-xl border border-[#ECECEC]" />
                  </>
                )}
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-3 rounded-xl border border-[#ECECEC]" />
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" minLength="6" required className="w-full px-4 py-3 rounded-xl border border-[#ECECEC]" />
                <button disabled={loading} className="w-full py-3 rounded-xl bg-[#3FAE5C] text-white font-medium disabled:opacity-60">
                  {loading ? 'Please wait...' : mode === 'signup' ? 'Join the movement' : 'Log in'}
                </button>
              </form>
            </>
          )}
          {status && <p className="mt-5 text-center text-[#3FAE5C]">{status}</p>}
          {error && <p className="mt-5 text-center text-red-600">{error}</p>}
        </div>
      </section>
    </main>
  );
}
