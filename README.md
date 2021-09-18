# directory-snapshot-explorer

Work in progress.

File explorer for JSON snapshots with meta information _(`name`, `type`, `size`, `mtime`, `crtime`, ...*)_ of local files. Scanner for creating of snapshots is included.

What? Just look:

**[Win 10 scan (as Admin)](https://alttiri.github.io/directory-snapshot-explorer/?filepath=/json-flat-scans/windows-admin.json.gz)** | 
[Win 10 scan](https://alttiri.github.io/directory-snapshot-explorer/?filepath=/json-flat-scans/windows.json.gz)

![Screenshot Win](https://user-images.githubusercontent.com/16310547/133657123-d1547a7b-6497-4da6-88ec-6e4928b2b044.png)


**[Ubuntu scan (as Root)](https://alttiri.github.io/directory-snapshot-explorer/?filepath=/json-flat-scans/ubuntu-admin.json.gz)** | 
[Ubuntu scan](https://alttiri.github.io/directory-snapshot-explorer/?filepath=/json-flat-scans/ubuntu.json.gz)

![Screenshot Ubnt](https://user-images.githubusercontent.com/16310547/133657142-75f15c86-ce70-4ef6-a21b-cdc0310bbb7e.png)

[Linux Source Code scan](https://alttiri.github.io/directory-snapshot-explorer/?filepath=/json-flat-scans/linux-master.json.gz)


---

Search is case sensitive.

[.exe](https://alttiri.github.io/directory-snapshot-explorer/?filepath=/json-flat-scans/windows-admin.json.gz&search=.exe)

![Screenshot Search](https://user-images.githubusercontent.com/16310547/133657172-685801b2-5895-4876-8730-b11b8553f168.png)

Search by file type, for example: `/type:folder/query`
(`folder`, `file`, `symlink` for Windows and `fifo`, `charDev`, `blockDev`, `socket` in additional for other platforms).

[/type:folder/.exe](https://alttiri.github.io/directory-snapshot-explorer/?filepath=/json-flat-scans/windows-admin.json.gz&search=/type:folder/.exe)

![Screenshot Search Folder](https://user-images.githubusercontent.com/16310547/133657180-9fc03183-d50d-47ff-badc-252fcdfe6952.png)

Only up to 1000 rows are displayed.

---

*It also contains information about symlinks (where it go) and hard links (count of it).

