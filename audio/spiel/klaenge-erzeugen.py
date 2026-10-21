import numpy as np, wave, io, base64, json
SR=22050
def env(n,att,dec):
    t=np.arange(n)/SR; a=np.minimum(1,t/att) if att>0 else np.ones(n)
    a=0.5-0.5*np.cos(np.pi*np.minimum(1,t/att)) if att>0 else a
    return a*np.exp(-t/dec)
def note(f,dur,parts,att=0.006,dec=0.4,glide=0):
    n=int(dur*SR); t=np.arange(n)/SR; y=np.zeros(n)
    fr=f*(1+glide*t/dur)
    ph=2*np.pi*np.cumsum(fr)/SR
    for ratio,amp,dk in parts:
        y+=amp*np.sin(ph*ratio)*np.exp(-t/(dec*dk))
    return y*env(n,att,1e9)
def mix(events,total):
    out=np.zeros(int(total*SR))
    for start,y in events:
        i=int(start*SR); out[i:i+len(y)]+=y[:len(out)-i]
    return out
def lowpass(y,a=0.35):
    out=np.zeros_like(y); s=0
    for i,v in enumerate(y): s+=a*(v-s); out[i]=s
    return out
def room(y,d=0.09,g=0.18):
    k=int(d*SR); out=y.copy()
    for r in range(1,4): out[k*r:]+=y[:-k*r]*(g**r)
    return out
def fin(y,peak_db):
    y=y-np.mean(y); fade=int(0.02*SR); y[-fade:]*=np.linspace(1,0,fade)
    y=y/np.max(np.abs(y))*10**(peak_db/20); return y
def wav(y):
    b=io.BytesIO(); w=wave.open(b,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((y*32767).astype('<i2').tobytes()); w.close(); return b.getvalue()
BELL=[(1,1,1),(2.0,0.18,0.5),(3.0,0.06,0.3),(4.16,0.03,0.2)]
WOOD=[(1,1,1),(3.93,0.18,0.25),(9.2,0.03,0.1)]
KAL=[(1,1,1),(5.4,0.07,0.15),(2.0,0.05,0.6)]
PAD=[(1,1,1),(2,0.08,1)]
S={}
# A Glöckchen
S['A_ok']=room(mix([(0,note(659.3,1.0,BELL,0.008,0.45)),(0.12,note(880,1.1,BELL,0.008,0.5))],1.3))
S['A_no']=room(mix([(0,note(392,0.6,BELL,0.01,0.22,glide=-0.02))],0.75))
# B Holz
S['B_ok']=room(mix([(0,note(523.3,0.4,WOOD,0.004,0.12)),(0.09,note(659.3,0.45,WOOD,0.004,0.14)),(0.18,note(784,0.6,WOOD,0.004,0.18))],0.9),0.07,0.15)
S['B_no']=room(mix([(0,note(220,0.35,WOOD,0.004,0.1))],0.5),0.07,0.12)
# C Kalimba
S['C_ok']=room(mix([(0,note(587.3,0.9,KAL,0.005,0.35)),(0.14,note(880,1.0,KAL,0.005,0.4))],1.25))
S['C_no']=room(mix([(0,note(440,0.5,KAL,0.005,0.2)),(0.16,note(392,0.6,KAL,0.005,0.22))],0.85))
# D Hauch (sanfter Ton, weicher Einsatz)
S['D_ok']=lowpass(mix([(0,note(523.3,1.0,PAD,0.05,0.35)),(0.0,note(659.3,1.0,PAD,0.07,0.33)*0.8)],1.05),0.25)
S['D_no']=lowpass(mix([(0,note(261.6,0.55,PAD,0.04,0.18,glide=-0.03))],0.6),0.25)
# E Quarte (Leo, 21.10.: „Tomemos A!") — gleiche Lage und Klangfarbe wie D_no (Do⁴),
#   richtig = Do⁴ kurz → Fa⁴ klingt aus. Ersetzt D_ok als richtig.wav (D_ok: Dur-Terz eine Oktave höher, ermüdend).
S['E_ok']=lowpass(mix([(0,note(261.6,0.25,PAD,0.025,0.18)),(0.13,note(349.2,0.65,PAD,0.025,0.25))],0.8),0.25)
out={}
for k,y in S.items():
    y=fin(y,-13 if k in ('A_ok','B_ok','C_ok','D_ok') else -16)   # E_ok so leise wie der Fehlton
    data=wav(y); open(k+'.wav','wb').write(data)
    out[k]='data:audio/wav;base64,'+base64.b64encode(data).decode()
    print(k,len(data))
json.dump(out,open('klaenge.json','w'))
# Im Spiel aktiv: richtig.wav = E_ok, nicht-ganz.wav = D_no
import shutil; shutil.copy('E_ok.wav','richtig.wav'); shutil.copy('D_no.wav','nicht-ganz.wav')
