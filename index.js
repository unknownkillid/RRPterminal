const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const terminal = document.getElementById('terminal');
const xBtn = document.getElementById('xBtn')

xBtn.addEventListener('click', () => {
    terminal.style.display = 'none'
    admin = false;
    porthack = false;
    ssh = false;
    chmod = false;
})

let offset = terminal.pageYOffset;

inputEl.focus();
inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        setTimeout(() => {
            terminal.scrollBy(0, 500000)
        }, 50);
        const command = inputEl.value;
        handleCommand(command);
        inputEl.value = '';
    }
});

let completed = false;
let currentRoom = 'start';
let admin = false;
let porthack = false;
let ssh = false;
let chmod = false;
let progressBar = "-------------------------- Completed -------------------------";

const rooms = {
    start: {
        description: `commands: <br>"help" <br><br>"sudo su - სისტემის ადმინისტრატორი"
        <br> "porthack -w file/wordlist.txt - პორტების დაჰაკვა"
        <br> "ssh22 config.py ssh პროტოკილოს მოხსნა"
        <br> "chmod 777 deletelog.py ლოგების წაშლა"`,
        exits: { north: 'help' },
    },
};

function handleCommand(command) {
    let output = '';

    switch (command) {
        case 'help':
            output = rooms[currentRoom].description;
            break;

        case 'sudo su':
            output = `Now you are root let's start what you wanna do.`;
            admin = true;
            break;

        case 'porthack -w file/wordlist.txt':

            output = `<br> eth0  Link encap:Ethernet  HWaddr 00:0B:CD:1C:18:5A
            inet addr:172.16.25.126  Bcast:172.16.25.63  Mask:255.255.255.224
            inet6 addr: fe80::20b:cdff:fe1c:185a/64 Scope:Link
            UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
            RX packets:2341604 errors:0 dropped:0 overruns:0 frame:0
            TX packets:2217673 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:1000
            RX bytes:293460932 (279.8 MiB)  TX bytes:1042006549 (993.7 MiB)
            Interrupt:185 Memory:f7fe0000-f7ff0000
            <br> <br>
            lo      Link encap:Local Loopback
            inet addr:127.0.0.1  Mask:255.0.0.0
            inet6 addr: ::1/128 Scope:Host
            UP LOOPBACK RUNNING  MTU:16436  Metric:1
            RX packets:5019066 errors:0 dropped:0 overruns:0 frame:0
            TX packets:5019066 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:0
            RX bytes:2174522634 (2.0 GiB)  TX bytes:2174522634 (2.0 GiB)
          <br><br>
          tun0      Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
            inet addr:10.1.1.1  P-t-P:10.1.1.2  Mask:255.255.255.255
            UP POINTOPOINT RUNNING NOARP MULTICAST  MTU:1500  Metric:1
            RX packets:0 errors:0 dropped:0 overruns:0 frame:0
            TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:100
            RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b) <br> <br>` + progressBar


            if (admin) {
                porthack = true
            } else if (porthack) {
                output = 'all ports hacked!'
            } else {
                output = "you are not admin"
            }
            break;

        case 'ssh22 config.py':
            output = `ssh.service - OpenBSD Secure Shell server
            <br>Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
            <br>Active: active (running) since Thu 2020-05-14 15:08:23 CEST; 24h ago
            <br>Main PID: 846 (sshd)
            <br>Tasks: 1 (limit: 4681)
            <br>CGroup: /system.slice/ssh.service
                    <br>└─846 /usr/sbin/sshd -D
         <br>
         <br>Mai 14 15:08:22 inlane systemd[1]: Starting OpenBSD Secure Shell server...
        <br> Mai 14 15:08:23 inlane sshd[846]: Server listening on 0.0.0.0 port 22.
         <br>Mai 14 15:08:23 inlane sshd[846]: Server listening on :: port 22.
         <br>Mai 14 15:08:23 inlane systemd[1]: Started OpenBSD Secure Shell server.
        <br> Mai 14 15:08:30 inlane systemd[1]: Reloading OpenBSD Secure Shell server.
         <br>Mai 14 15:08:31 inlane sshd[846]: Received SIGHUP; restarting.
         <br>Mai 14 15:08:31 inlane sshd[846]: Server listening on 0.0.0.0 port 22.
         <br>Mai 14 15:08:31 inlane sshd[846]: Server listening on :: port 22.`;


            if (porthack) {
                ssh = true
            } else if (ssh) {
                output = 'ssh protocol succesfully down!'
            } else {
                output = "ssh protocol not found!"
            }
            break;

        case 'chmod 777 deletelog.py':

            output = `<br>Sep 11 09:46:33 sys1 crontab[20601]: (root) BEGIN EDIT (root)
                <br>Sep 11 09:46:39 sys1 crontab[20601]: (root) REPLACE (root)
                <br>Sep 11 09:46:39 sys1 crontab[20601]: (root) END EDIT (root)
                <br>Dec 19 07:35:21 localhost exiting on signal 15
                <br>Dec 19 16:49:31 localhost syslogd 1.4.1#17ubuntu3: restart
                <br>Jun  1 22:20:05 secserv kernel: Kernel logging (proc) stopped.
                <br>Jun  1 22:20:05 secserv kernel: Kernel log daemon terminating.
                <br>Jun  1 22:20:06 secserv exiting on signal 15
                <br>Nov 27 08:05:57 galileo kernel: Kernel logging (proc) stopped.
                <br>Nov 27 08:05:57 galileo kernel: Kernel log daemon terminating.
                <br>Nov 27 08:05:57 galileo exiting on signal 15
                <br>May 05 08:57:27 ubuntu-bionic sshd[5544]: pam_unix(sshd:session): session opened for user vagrant by (uid=0)
                <br>[Tue May 5 08:41:31 2020] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)
                <br>template(name="LogseneFormat" type="list" option.json="on") {
                    <br>constant(value="{")
                    <br>constant(value="\"@timestamp\":\"")
                    <br>property(name="timereported" dateFormat="rfc3339")
                    <br>constant(value="\",\"message\":\"")
                    <br>property(name="msg")
                    <br>constant(value="\",\"host\":\"")
                    <br>property(name="hostname")
                    <br>constant(value="\",\"severity\":\"")
                    <br>property(name="syslogseverity-text")
                    <br>constant(value="\",\"facility\":\"")
                    <br>property(name="syslogfacility-text")
                    <br>constant(value="\",\"syslog-tag\":\"")
                    <br>property(name="syslogtag")
                    <br>constant(value="\",\"source\":\"")
                    <br>property(name="programname")
                    <br>constant(value="\"}")
                   <br>}
                   <br>module(load="omelasticsearch")
                   <br>action(type="omelasticsearch"
                    <br>template="LogseneFormat" # the template that you defined earlier
                    <br>searchIndex="LOGSENE_APP_TOKEN_GOES_HERE"
                    <br>server="logsene-receiver.sematext.com"
                    <br>serverport="443"
                    <br>usehttps="on"
                    <br>bulkmode="on"
                    <br>queue.dequeuebatchsize="100" # how many messages to send at once
                   `;
            completed = true;
            if (ssh) {
                chmod = true;
            } else if (chmod) {
                output = "logs already deleted!"
            } else {
                output = 'logs not found'
            }

            break;

        default:
            output = 'Unknown command: ' + command;
    }

    outputEl.innerHTML += `<div class="prompt">$></div><div>${command}</div><div>${output}</div>`;
}

// Initial description
outputEl.innerHTML += `<div class="prompt">იმისთვის რომ მოიპოვოთ წვდომა კარებებზე ამისთვის უნდა გატეხოთ სისტემა.</div><div></div><div>${rooms[currentRoom].description}</div>`;

function hacked() {
    if (completed) {
        setTimeout(() => {
            terminal.style.display = 'none'
            document.getElementById('completed').classList.remove('completedandDone')
            setTimeout(() => {
                document.getElementById('main').classList.add('mainNone')
                admin = false;
                porthack = false;
                ssh = false;
                chmod = false;
            }, 3000);
        }, 2000);
    }
    requestAnimationFrame(hacked)
}

hacked();